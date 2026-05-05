//CRIANDO SERVIDOR 

//Buscando o protocolo http no Node.js
const http = require('http');

//Aqui criamos um serivdor com uma requisição e uma resposta
const server = http.createServer((req, res) => {
    //Buscando o tipo de requisição.
    console.log(req.method)
 
    //Passando a resposta do servidor com: 
    //statusCode = 200 
    // tipop de resposta em um texto simples
    res.writeHead(200, {'Content-Type':'text/plain'})
    
    //Resposta do servidor, renderizada na tela do navegador.
    res.end('Servidor funcionando!')
})
//Indicação da porta para acesso ao servidor '
server.listen(3000, ()=>{
    console.log("O servidor está rodando na porta 3000")
    console.log('http://localhost:3000')
})