import express from 'express';
import { googleLogin, register, login, getMe, logoutUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/google', googleLogin);
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', getMe);       // re-hydrate user data on page reload
authRouter.post('/logout', logoutUser);


export default authRouter;
