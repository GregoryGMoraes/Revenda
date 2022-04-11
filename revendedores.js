const express = require('express');
const router = express.Router();

const dbKnex = require("./data/db_config");  // dados de conexão com o banco de dados

// middleware para aceitar dados no formato JSON 
router.use(express.json());

// método get é usado para consulta
router.get("/", async (req, res) => {
  try {
    // para obter os revendedores pode-se utilizar .select().orderBy() ou apenas .orderBy()
    const revendedores = await dbKnex("revendedores").orderBy("id", "nome");
    res.status(200).json(revendedores); // retorna statusCode ok e os dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});

module.exports = router;