const express = require('express')
const app = express()
const port = 3000

const carros = require("./carros")
const revendedores = require("./revendedores")

app.get('/', (req, res) => {
    res.send('<h2>Seja Bem-vindo</h2>')
})

app.use('/carros', carros);  // identificação da rota e da const (require) associada
app.use('/revendedores', revendedores);  // identificação da rota e da const (require) associada


app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`)
})