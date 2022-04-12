const express = require('express');
const router = express.Router();

const dbKnex = require("./data/db_config");  // dados de conexão com o banco de dados

// middleware para aceitar dados no formato JSON 
router.use(express.json());


// método get é usado para consulta
router.get("/", async (req, res) => {
    try {
        // para obter os carros pode-se utilizar .select().orderBy() ou apenas .orderBy()
        const carros = await dbKnex("carros")
        .orderBy("id", "modelo")
        .innerJoin('revendedores', 'revendedor_id', 'revendedores.id');
        res.status(200).json(carros); // retorna statusCode ok e os dados
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});


// Método post é usado para inclusão
router.post("/", async (req, res) => {
    const { modelo, marca, ano, preco, revendedor_id } = req.body;

    // se algum dos campos não foi passado, irá enviar uma mensagem de erro e retornar
    if (!modelo || !marca || !ano || !preco || !revendedor_id) {
        res.status(400).json({ msg: "Enviar modelo, marca, ano, preço e revendedor_id do veículo" });
        return;
    }

    try {
        // insert, faz a inserção na tabela carros (e retorna o id do registro inserido)
        const novo = await dbKnex("carros").insert({ modelo, marca, ano, preco, revendedor_id });
        res.status(201).json({ id: novo[0] }); // statusCode indica Create
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});


// Método put é usado para alteração. id indica o registro a ser alterado altera todos os campos
router.put("/:id", async (req, res) => {
    const id = req.params.id; // ou const { id } = req.params
    const { modelo, marca, ano, preco, revendedor_id } = req.body; // campo a ser alterado
    try {
        await dbKnex("carros").update({ modelo, marca, ano, preco, revendedor_id }).where("id", id); // ou .where({ id })
        res.status(200).json(); // statusCode indica Ok
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});


// Método delete é usado para exclusão
router.delete("/:id", async (req, res) => {
    const { id } = req.params; // id do registro a ser excluído
    try {
        await dbKnex("carros").del().where({ id });
        res.status(200).json(); // statusCode indica Ok
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});


// Método get usado para pesquisar pela palavra chave
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

//Método get usado para média dos preços
router.get("/media", async (req, res) => {
    try {
        const consultaCarros = await dbKnex("carros")
            .count({ numCarros: "*" }) //Quantidade de carros
            .sum({ total: "preco" })   //Preço total dos carros
            .avg({ media: "preco" })   //Média de preço do carros 
        const { numCarros, total, media } = consultaCarros[0];
        res.status(200).json({ numCarros, total:Number(total.toFixed(2)), media:Number(media.toFixed(2)) }); // retorna statusCode ok e os dados
    } catch (error) {
        res.status(400).json({ msg: error.message }); // retorna status de erro e msg
    }
});

module.exports = router;