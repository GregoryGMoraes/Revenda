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

// Método post é usado para inclusão
router.post("/", async (req, res) => {
    const { nome, contato } = req.body;

    // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
    if ( !nome || !contato ) {
        res.status(400).json({ msg: "Enviar nome e contato do revendedor" });
        return;
    }

    try {
        // insert, faz a inserção na tabela revendedores (e retorna o id do registro inserido)
        const novo = await dbKnex("revendedores").insert({ nome, contato });
        res.status(201).json({ id: novo[0] }); // statusCode indica Create
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});


// Método put é usado para alteração. id indica o registro a ser alterado altera todos os campos
router.put("/:id", async (req, res) => {
    const id = req.params.id; // ou const { id } = req.params
    const { nome, contato } = req.body; // campo a ser alterado
    try {
        await dbKnex("revendedores").update({ nome, contato }).where("id", id); // ou .where({ id })
        res.status(200).json(); // statusCode indica Ok
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});

// Método delete é usado para exclusão
router.delete("/:id", async (req, res) => {
    const { id } = req.params; // id do registro a ser excluído
    try {
        await dbKnex("revendedores").del().where({ id });
        res.status(200).json(); // statusCode indica Ok
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});


module.exports = router;