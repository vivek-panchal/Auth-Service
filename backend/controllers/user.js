import TryCatch from "../middlewares/TryCatch.js";
import sanitize from "mongo-sanitize";
import { registerSchema } from "../config/zod.js";

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

    res.json({
        name,
        email,
        password,
    });
});