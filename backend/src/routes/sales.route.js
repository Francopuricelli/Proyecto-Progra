import { Router } from "express";
import SaleController from "../controller/sale.controller.js";

const router = Router();

router.post("/create", SaleController.create);
router.get('/:id', SaleController.getById);
router.get("/", SaleController.getAll);

export default router;