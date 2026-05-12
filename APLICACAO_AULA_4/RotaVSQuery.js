const http = require ('http')
const url = require('url')

//pathname = Rota 
//query = dados enviados pela URL 

const server = http.createServer((req, res) => {
    const urlCompleta = url.parse(req.url, true);


    //Dados importantes 

    const rota = urlCompleta.pathname;
    const query =urlCompleta.query;
    //Teste básico de rotas + query 
    if (rota === "/teste" && req.method === "GET"){
        res.end(JSON.stringify({
            mensagem: "Funcionou seu cabaço burro!",
            dadosRecebidos: query
            
        }));
        return    
    }
    res.end("Rota não encontrada!!") ;

});

server.listen(3000, () =>{
    console.log("Servidor rodando em http://localhost:3000")
})
