const express = require('express');
const router = express.Router();

const dbKnex = require("./data/db_config");  // dados de conexão com o banco de dados

// middleware para aceitar dados no formato JSON 
router.use(express.json());


// método get é usado para consulta
router.get("/", async (req, res) => {
  try {
    // para obter os carros pode-se utilizar .select().orderBy() ou apenas .orderBy()
    const carros = await dbKnex("carros").orderBy("id", "modelo");
    res.status(200).json(carros); // retorna statusCode ok e os dados
  } catch (error) {
    res.status(400).json({ msg: error.message }); // retorna status de erro e msg
  }
});


// método get usado para pesquisar pela palavra chave
router.get("/pesquisar/:palavra", async (req, res) => {
    const { palavra } = req.params;
    try {
      const carros = await dbKnex("carros").select("modelo", "marca", "ano", "preco")
        .where("modelo", "like", `%${palavra}%`)
        .orWhere("marca", "like", `%${palavra}%`)
      res.status(200).json(carros); // retorna statusCode ok e os dados
    } catch (error) {
      res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
  });

module.exports = router;