import { Router } from 'express';
import AdminController from '../controller/admin.controller.js';
const router = Router();

router.post('/login', AdminController.login);

router.post('/register', AdminController.register);


export default router;