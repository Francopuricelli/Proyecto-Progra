import { Router } from "express";
import UserController from "../controller/user.controller.js";
const router = Router();

router.post('/create', UserController.create);

export default router;


