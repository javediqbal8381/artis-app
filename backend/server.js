const express = require('express')
const cors = require('cors')
const connectDB = require('./db');
require('dotenv').config();

// routes
const productsRoute = require('./routes/productsRoute')
const shopsRoute = require('./routes/shopsRoute')

const app = express()

// Connect to MongoDB
connectDB();

const PORT = 4000

app.use(cors())
app.use(express.json())

// Use products route
app.use('/api/products', productsRoute);

//Use shops route
app.use('/api/shops', shopsRoute);


app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})




