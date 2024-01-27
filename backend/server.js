const express = require('express')
const cors = require('cors')

const app = express()

const PORT = 4000

app.use(cors())

app.get('/api/test', (req, res) => {
res.redirect()
})

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})




