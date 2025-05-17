import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getConnection() {
    return open({
      filename: path.join(__dirname, '../../cart.db'), // aquí guardamos la base de datos
      driver: sqlite3.Database
    });
  }
  