import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    listProducts,
    getCategories
} from '../controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/products', listProducts);
router.get('/products/categories', getCategories);
router.get('/products/:id', getProductDetails);

// Protected routes (Admin only)
router.post('/products', verifyToken, verifyAdmin, createProduct);
router.put('/products/:id', verifyToken, verifyAdmin, updateProduct);
router.delete('/products/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;
