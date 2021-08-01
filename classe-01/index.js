const express = require('express');
const app = express();
app.use(express.json());

const convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];

app.get('/convidados', (req, res) => {
    const { nome } = req.query

    if (!!nome) {
        const naLista = convidados.find(convidado => convidado == nome);
        return !!naLista ? res.json({ "mensagem": "Convidado presente." }) : res.json({ "mensagem": "O convidado buscado não está presente." })
    }
    return res.json(convidados);

});

app.post('/convidados', (req, res) => {
    const nome = req.body.nome;
    const verificacao = convidados.find(convidado => convidado === nome);

    return !!verificacao ? res.json({ "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também." }) : convidados.push(nome) && res.json({ "mensagem": "Convidado adicionado." });
});

app.delete('/convidados/:nome', (req, res) => {
    const nome = req.params.nome;
    const verificacao = convidados.find(convidado => convidado === nome);
    const indice = convidados.indexOf(nome);

    return !!verificacao ? convidados.splice(indice, 1) && res.json({ "mensagem": "Convidado removido." }) : res.json({ "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido." })
})

app.listen(8000);