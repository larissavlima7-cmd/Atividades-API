// Importa o framework
const express = require('express');

//importar o FS para leitura e escrita de arquivos
const fs = require('fs');
//Cria a aplicação express
const app = express();

//Definir uma porta para o server
const PORT = 3001;
//Permite o servidor entender JSON enviado no Body
//Sem isso, req. body = undefined
app.use(express.json());
//caminho Arquivo
const ARQUIVO = "./clientes.json";

//Inicio das funções:
function lerDados(){
    const dados = fs.readFileSync(ARQUIVO, "utf-8");
    //converter o JSON para objeto JS
    return JSON.parse(dados);
}

function salvarDados(dados){
    fs.writeFileSync(ARQUIVO, JSON.stringify(dados,null,2));
}


// Rota GET
app.get('/usuarios', (req, res) => {
    try {
        const dados = lerDados();
        res.json(dados);
    } catch(erro){
        res.status(400).send("Erro ao ler os dados do servidor.")
    }
});

app.listen(PORT, () => {
    console.log('====================================');
    console.log(`PROJETO: Servidor de Pedidos`);
    console.log(`API rodando em http://localhost:${PORT}/usuarios`);
    console.log('====================================');
});