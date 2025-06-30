import { Router } from 'express';
import ProductDao from '../dao/product.dao.js';

const router = Router();

router.get('/admin-edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.getById(id);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('admin-edit', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

export default router;

router.get("/admin-login", (req, res) =>{
  res.render("admin-login")
})
router.get("/index", async (req, res) =>{
    try {
        const products = await ProductDao.getAll();
        res.render("index", { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
})
router.get("/admin-create", (req, res) =>{
  res.render("admin-create")
})