import { Router } from "express";
import ProductController from "../controller/product.controller.js";
const router = Router();

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.post('/create', ProductController.create);

router.put('/:id', ProductController.update);

router.delete('/:id', ProductController.delete);

router.patch('/:id/toggle', ProductController.toggleEstado);

export default router;


