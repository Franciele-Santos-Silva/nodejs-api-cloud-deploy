const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Produtos = require("./models/Produtos");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/cadastro", (req, res) => {
  Produtos.create({
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
  })
    .then(() => {
      res.send("Produto cadastrado com sucesso!!!");
    })
    .catch((erro) => {
      res.send("Erro ao cadastrar produto" + erro);
    });
});

app.get("/", (req, res) => {
  Produtos.findAll()
    .then((produtos) => {
      res.send(produtos);
    })
    .catch((erro) => {
      res.send("Erro ao buscar dados" + erro);
    });
});

app.get("/:nome", (req, res) => {
  Produtos.findAll({ where: { nome: req.params.nome } })
    .then((produto) => {
      res.send({
        mensagem: "Produto encontrado",
        dados: produto,
      });
    })
    .catch((erro) => {
      res.send("Produto não encontrado" + erro);
    });
});

app.patch("/atualizar/:id", (req, res) => {
  Produtos.update(
    {
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    },
    { where: { id: req.params.id } },
  )
    .then(() => {
      res.send("Sucesso ao atualizar os dados do produto!!!");
    })
    .catch((erro) => {
      res.send("Erro ao atualizar os dados do produto" + erro);
    });
});

app.delete("/deletar/:id", (req, res) => {
  Produtos.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("Produto deletado com sucesso!!!");
    })
    .catch((erro) => {
      res.send("Erro ao deletar produto" + erro);
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT,"0.0.0.0", () => {
  console.log("Rodando...");
});
