const express = require("express");
const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "A Odisséia de Jonas",
        autor: "Thomas Crawling",
        ano: 2001,
        numPaginas: 197
    },
    {
        id: 2,
        titulo: "Jonas e a sociedade escondida",
        autor: "Claire Crawling",
        ano: 2004,
        numPaginas: 158
    }
];

app.get("/livros", (req, res) => {
    res.json(livros);
});

app.get("/livros/:id", (req, res) => {
    const consulta = livros.find(livro => livro.id === Number(req.params.id));

    if (!!consulta) {
        res.json(consulta)
    } else if (Number(req.params.id)) {
        res.json({ "mensagem": "Não existe livro para o ID informado." });
    } else {
        res.json({ "mensagem": "O valor do parâmetro ID da URL não é um número válido." })
    }
});

let proximoId = livros.length + 1;

app.post("/livros", (req, res) => {
    const livro = {
        id: proximoId,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        numPaginas: req.body.numPaginas
    }
    livros.push(livro);
    res.json(livro);
    proximoId++;
});

app.put("/livros/:id", (req, res) => {
    const consulta = livros.find(livro => livro.id === Number(req.params.id));
    if (consulta) {
        consulta.titulo = req.body.titulo,
            consulta.autor = req.body.autor,
            consulta.ano = req.body.ano,
            consulta.numPaginas = req.body.numPaginas
        res.json({ "mensagem": "Livro substituído." });
    } else {
        res.json({ "mensagem": "Não existe livro a ser substituído para o ID informado." });
    }
});

app.patch("/livros/:id", (req, res) => {
    const consulta = livros.find(livro => livro.id === Number(req.params.id));

    if (consulta) {
        if (req.body.titulo) {
            consulta.titulo = req.body.titulo;
        }
        if (req.body.autor) {
            consulta.autor = req.body.autor;
        }
        if (req.body.ano) {
            consulta.ano = req.body.ano;
        }
        if (req.body.numPaginas) {
            consulta.numPaginas = req.body.numPaginas;
        }
        res.json({ "mensagem": "Livro alterado." });
    } else {
        res.json({ "mensagem": "Não existe livro a ser alterado para o ID informado." });
    }

});

app.delete("/livros/:id", (req, res) => {
    const consulta = livros.find(livro => livro.id === Number(req.params.id));
    const indice = livros.indexOf(consulta);
    if (consulta) {
        livros.splice(indice, 1)
        res.json({ "mensagem": "Livro removido." });
    } else {
        res.json({ "mensagem": "Não existe livro a ser removido para o ID informado." })
    }
})

app.listen(8000);