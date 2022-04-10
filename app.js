const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('<h2>Seja Bem-vindo</h2>')
})

app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`)
})