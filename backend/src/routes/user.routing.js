import { Router } from 'express';
import UserController from '../controller/user.controller.js';
const router = Router();

router.post('/login', UserController.login);

router.post('/register', UserController.register);


export default router;