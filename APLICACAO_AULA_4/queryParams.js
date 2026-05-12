// Fazendo requerimento/importação dos modulos HTTP e URL do node
const http = require ('http')
const url = require('url')


// Criação do servidor 
//createServer é uma função reservada de dentro do modulo HTTP 
const server = http.createServer((req, res) =>{
    //aqui reecebemos uma URL e "quebranod" a mesma, colocando como texto;
    // recebe primeiramente a URL da requisição, que é colocada no navegador, 
    //estamos quebrando ela para que seja recebida como um texto e não como um link 
    //.parse é usado para transformar link em texto
    // true, afirma que a URL tem que ser verdadeira 

    const urlCompleta = url.parse(req.url, true); 
    console.log(urlCompleta);

    res.end('Veja o console')

})

// aqui estamos determinando qual porta está rodando nosso servidor. 
server.listen(3000, ()=>{
    console.log('Servidor rodando em http://localhost:3000')
})



