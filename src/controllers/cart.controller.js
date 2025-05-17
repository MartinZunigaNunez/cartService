// src/controllers/cart.controller.js
import { addToCart, deleteCart, getCart, removeFromCart } from '../models/cart.model.js';
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

const products_url = process.env.PRODUCTS_SERVICE_URL
// console.log(process.env.PRODUCTS_SERVICE_URL)

// POST /api/cart
export async function handleAddToCart(req, res) {
  try {
    const userId = req.user.id; // viene del middleware de auth
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId y quantity son requeridos' });
    }

    await addToCart(userId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito' });
  } catch (err) {
    console.error('Error al agregar al carrito:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
// GET /api/cart
// export async function handleGetCart(req, res) {
//     try {
//       const userId = req.user.id;
//       const cart = await getCart(userId);
//       res.json(cart);
//     } catch (err) {
//       console.error('Error al obtener el carrito:', err);
//       res.status(500).json({ error: 'Error interno del servidor' });
//     }
//   }
  
  // DELETE /api/cart/:productId
  export async function handleRemoveFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
  
      await removeFromCart(userId, productId);
      res.json({ message: 'Producto eliminado del carrito' });
    } catch (err) {
      console.error('Error al eliminar producto del carrito:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


  export async function handleDeleteCart(req, res){
    try {
        const userId = req.user.id;

        await deleteCart(userId);
        res.json( { message: 'El carrito se borro '})

    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); 
    }
  }


export async function handleGetCart(req, res) {
  try {
    const userId = req.user.id;
    const cartItems = await getCart(userId);

    const productIds = cartItems.map(item => item.product_id);
    if (productIds.length === 0) {
      return res.json([]);
    }

    // Llamada al microservicio de productos
    console.log('🕵🏼‍♂️', products_url)
    const { data: products } = await axios.post(`${products_url}/bulk`, {
      ids: productIds
    });

    // Unir info del carrito con detalles del producto
    const detailedCart = cartItems.map(item => {
      const product = products.find(p => p.id === item.product_id);
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        product: product || null
      };
    });

    res.json(detailedCart);

  } catch (err) {
    console.error('Error al obtener el carrito:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
