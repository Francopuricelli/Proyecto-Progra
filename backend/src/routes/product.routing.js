import { Router } from "express";
import ProductController from "../controller/product.controller.js";
import imageUpload from "../middlewares/upload.js";
const router = Router();

router.get('/', ProductController.getAllByPage);

router.get('/all', ProductController.getAll); // Endpoint to get all products without pagination

router.get('/:id', ProductController.getById);

router.post('/create', imageUpload.single("imagen"), ProductController.create);

router.put('/:id', imageUpload.single("imagen"), ProductController.update);

router.delete('/:id', ProductController.delete);

router.patch('/:id/toggle', ProductController.toggleEstado);

export default router;


