import express from 'express';
import { googleLogin, register, login } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/google', googleLogin);
authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;
