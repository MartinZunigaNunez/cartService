import express from 'express'
import cors from 'cors'
import cartRoutes from './routes/cart.routes.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/cart', cartRoutes)

app.get('/', (req,res) => {
    res.json({ message: 'Cart service active'})
})

export default app;