import { initCartTable } from "./models/cart.model.js"
import app from './app.js'
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 4002

initCartTable().then(()=> {
    app.listen(PORT, () => {
        console.log(`Carrito activo en http://localhost:${PORT}`)
    })
})