import TryCatch from "../middlewares/TryCatch.js";
import sanitize from "mongo-sanitize";
import { redisClient } from "../index.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendMail from "../config/sendMail.js";
import { registerSchema , loginSchema} from "../config/zod.js";
import { getOtpHtml, getVerifyEmailHtml } from "../config/html.js";

export const registerUser = TryCatch(async (req, res) => {
    // Registration logic here
    const sanitizedBody = sanitize(req.body);
    const validatedData = registerSchema.safeParse(sanitizedBody);
    
    if(!validatedData.success) {
        const errors = validatedData.error;
        let errorMessages = 'Validation failed';
        let allErrors = [];
        if(errors ?.issues && Array.isArray(errors.issues)) {
            allErrors = errors.issues.map((issue) => ({
                field: issue.path ? issue.path.join('.') : 'unknown',
                message: issue.message || 'Invalid value',
                code: issue.code,
            }));
            errorMessages = allErrors[0].message || errorMessages;
        }
        return res.status(400).json({ message: errorMessages, errors: allErrors });
    }

    const { name, email, password } = validatedData.data;

    const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;
    //console.log('Checking rate limit for', req.ip, email);

    if(await redisClient.get(rateLimitKey)) {
        //console.log('Rate limit exceeded for', req.ip, email);
        return res.status(429).json({ message: 'Too many registration attempts. Please try again later.' });
    }

    const existingUser = await User.findOne({ email }); 
    //console.log('Existing user check for', email, existingUser);

    if(existingUser) {
        //console.log('User already exists for', email, existingUser);
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationKey = `verify:${verificationToken}`;

    const datatoStore = {
        name,
        email,
        password: hashedPassword,
    };
    // Store as string in Redis to avoid type errors
    // Token valid for 30 seconds
    await redisClient.set(verificationKey, JSON.stringify(datatoStore), { EX: 300 });

    const subject = 'Verify your email for Account creation';
    const html = getVerifyEmailHtml({email, token: verificationToken});
    //console.log('Sending verification email to', email);

    await sendMail({ email, subject, html });
    // Rate limit registration attempts per IP+email for 1 minute
    await redisClient.set(rateLimitKey, 'true', { EX: 60 });


    res.json({
        message: 'Registration successful. Please check your email to verify your account. The verification link is valid for 5 minutes.',
    });
});

export const verifyUser = TryCatch(async (req, res) => {
    const { token } = req.params;
    console.log('Verifying user with token:', token);
    if(!token) {
        return res.status(400).json({ message: 'Verification token is required' });
    }
    const verificationKey = `verify:${token}`;
    //console.log('Looking up verification key in Redis:', verificationKey);
    const userDataJSON = await redisClient.get(verificationKey);
    //console.log('Fetched user data from Redis for token:', token, 'Data:', userDataJSON);
    // console.log('Verification attempt with token', token, 'found data:', userDataJSON);
    if(!userDataJSON) {
        return res.status(400).json({ message: 'Verification token or link is invalid or has expired' });
    }

    const userData = JSON.parse(userDataJSON);    
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email }); 
    //console.log('Existing user check during verification for', email, existingUser);

    if(existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = await User.create({ name, email, password });

    await redisClient.del(verificationKey);
    res.status(201).json({ message: 'Email verified successfully. You can now log in.' , user:{_id: newUser._id, name: newUser.name, email: newUser.email } });
});

export const loginUser = TryCatch(async (req, res) => {
    // Login logic here
    const sanitizedBody = sanitize(req.body);
    const validatedData = loginSchema.safeParse(sanitizedBody);
    console.log('Login attempt with data:', sanitizedBody);
    
    if(!validatedData.success) {
        const errors = validatedData.error;
        let errorMessages = 'Validation failed';
        let allErrors = [];
        if(errors ?.issues && Array.isArray(errors.issues)) {
            allErrors = errors.issues.map((issue) => ({
                field: issue.path ? issue.path.join('.') : 'unknown',
                message: issue.message || 'Invalid value',
                code: issue.code,
            }));
            errorMessages = allErrors[0].message || errorMessages;
        }
        console.log('Validation errors:', allErrors);

        return res.status(400).json({ message: errorMessages, errors: allErrors });
    }

    const {email, password } = validatedData.data;
    console.log('Validated login data:', validatedData.data);

    const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;

    if(await redisClient.get(rateLimitKey)) {
        return res.status(429).json({ message: 'Too many login attempts. Please try again after 60 seconds.' });
    }

    const user = await User.findOne({ email });
    console.log('User found for login:', user);
    if(!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPasswordValid);
    if(!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }   
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', OTP);
    const otpKey = `otp:${email}`;
    await redisClient.set(otpKey, JSON.stringify(OTP), { EX: 300 }); // OTP valid for 5 minutes

    const subject = 'Your Login OTP Code';
    const html = getOtpHtml({email, otp: OTP });
    await sendMail({ email, subject, html });
    await redisClient.set(rateLimitKey, 'true', { EX: 60 }); // Rate limit login attempts per IP+email for 1 minute
    res.json({ message: 'OTP sent to your email. Please verify to complete login.' });
});