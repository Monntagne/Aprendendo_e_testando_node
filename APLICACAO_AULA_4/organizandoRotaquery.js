const http = require('http');
const url = require('url');

const server = http.createServer((req, res) =>{
    const urlCompleta = url.parse (req.url, true);

    const rota = urlCompleta.pathname
    const query =urlCompleta.query;
    
    //especificamos aqui que o tipo de resposta que vai ser devolvido será e JSON no Headre
    res.setHeader('Content-Type', 'application/json')
    

    if(rota === "/teste" && req.method === "GET"){
        res.end(JSON.stringify({
            Mensagem: "Dados Recebidos!",
            rota: rota,
            dados: query

        }));
        return;
    };

    if (rota === "/dados" && req.method === "POST"){
        let body =''
        req.on('data', parte =>{
            body += parte;
        });
        req.on('end', () =>{
            const dados = JSON.parse(body);
            console.log("objeto: ", dados);
            res.end(JSON.stringify({
                Mensagem: 'Dados recebidos com body!',
                dados: dados
            }));
        });
        return;
    };
  res.end(JSON.stringify({
    Mensagem: 'Rota não encontrada!!'
  }))  
})

server.listen(3000, () =>{
    console.log("Servidor rodando em http://localhost:3000")
})