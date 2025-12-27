import express from 'express';
import { registerUser, verifyUser, loginUser, verifyOtp, myProfile , refreshToken, logoutUser, refreshCsrfToken, adminController } from '../controllers/user.js';
import { isAuth, authorizedAdmin } from '../middlewares/isAuth.js';
import { verifyCSRFToken } from '../config/csrfMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.post('/verify', verifyOtp);
router.get('/me', isAuth, myProfile);
router.post('/refresh-token', refreshToken);
router.post('/logout', isAuth, verifyCSRFToken, logoutUser);
router.post('/refresh-csrf', isAuth, refreshCsrfToken);
router.get('/admin', isAuth, authorizedAdmin, adminController);

export default router;