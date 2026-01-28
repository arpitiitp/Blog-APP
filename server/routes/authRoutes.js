import express from 'express';
import { googleLogin } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/google', googleLogin);

export default authRouter;
