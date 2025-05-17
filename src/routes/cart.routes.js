import express from 'express'
import { handleAddToCart, handleDeleteCart, handleGetCart, handleRemoveFromCart } from '../controllers/cart.controller.js';
import { authenticate } from '../middleware/auth.middlewar.js';

const router = express.Router();

router.get('/', authenticate, handleGetCart)
router.post('/', authenticate, handleAddToCart)
router.delete('/', authenticate, handleDeleteCart)
router.delete('/:productId', authenticate, handleRemoveFromCart)

export default router;
