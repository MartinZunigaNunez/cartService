// src/models/cart.model.js
import { getConnection } from '../config/db.js';


export async function initCartTable() {
    const db = await getConnection();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

// Agregar producto al carrito
export async function addToCart(userId, productId, quantity) {
  const db = await getConnection();

  // Verificar si ya existe ese producto en el carrito
  const existing = await db.get(
    'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );

  if (existing) {
    // Si ya existe, actualizamos la cantidad
    const newQuantity = existing.quantity + quantity;
    await db.run(
      'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [newQuantity, userId, productId]
    );
  } else {
    // Si no existe, lo insertamos
    await db.run(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );
  }
}

// Obtener todos los productos del carrito de un usuario
export async function getCart(userId) {
    const db = await getConnection();
    const cart = await db.all(
      'SELECT * FROM cart_items WHERE user_id = ?',
      [userId]
    );
    return cart;
  }
  
  // Eliminar un producto del carrito
  export async function removeFromCart(userId, productId) {
    const db = await getConnection();
    await db.run(
      'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
  }

  export async function deleteCart(userId) {
    const db = await getConnection();
    const cart = await db.run(
      'DELETE FROM cart_items WHERE user_id = ?',
      [userId]
    );
  }


