import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/adminController.js';

const router = express.Router();

// Public
router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

export default router;
