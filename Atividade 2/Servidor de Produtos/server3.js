// Importa o framework
const express = require('express');

//importar o FS para leitura e escrita de arquivos
const fs = require('fs');
//Cria a aplicação express
const app = express();

//Definir uma porta para o server
const PORT = 3003;
//Permite o servidor entender JSON enviado no Body
//Sem isso, req. body = undefined
app.use(express.json());
//caminho Arquivo
const ARQUIVO = "./produtos.json";

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
app.get("/produtos/:grupo", (req, res)=>{
    const grupo = req.params.grupo;
    const dados = lerDados();

    //Verificar se o grupo existe
    if(!dados[grupo]){
        return res.status(404).json({
            erro: "Grupo não encontrado!"
        });
    } res.json(dados[grupo]);
});

app.listen(PORT, () => {
    console.log('====================================');
    console.log(`PROJETO: Servidor de Pedidos`);
    console.log(`API rodando em http://localhost:${PORT}/produtos/:grupo`);
    console.log(`\n\n Grupos disponíveis para uso: decoracao e limpeza`);
    console.log('====================================');
});