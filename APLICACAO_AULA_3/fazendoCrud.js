const http = require('http');


//Simula um "Banco de dados" em memoria 
// array de objetos 
let livros = [
   
  { id: 1, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling" },
  

];

const server = http.createServer((req, res)=>{
    //Aramazena o metodo requerido 
    const method = req.method;

    //armazenando a URL da requisição
    const url = req.url;

    //Vai enviar a requisição traduzida para jason 
    res.setHeader('content-Type','application/json')

    
    
    
    // MÉTODO GET 
    //Vai trazer a lista de liovros que está no array de livros nesse arquivo. 
    if (url ==="/livros" && method === "GET"){

        //Status 200 = suceso 
        res.statusCode = 200;

        //Retorna a lista de livros em formato JSON 
        res.end(JSON.stringify(livros));

        return; //Encerra a requisição 

    }








//MÉTODO POST 
if (url === "/livros" && method === "POST") {
    //variavel fica vazia para armazenar os dados que vão ser enviados de moso fragmentados 
    let body = '';
    
    //.on significa que toda vez que essa requisição for feita inicia uma ação, ou seja o ".on" é um start para uma ação 
    //'data' simboliza o inicio de uma informação para esse contexto
    //parte simboliza as partes que vão ser recebidas 
   
   
    req.on('data', parte => {
        //aqui ele vai recebr o body mais uma parte
        //body = primeira parte, body = primeira parte + a segunda parte e assim susetivamentente até receber todas as partes. 
        body += parte   
    
    });

    //Realizando a leitura de um arquivo JSON para STRING 
    req.on('end', () =>{
        const novoLivro = JSON.parse(body); 
    
        livros.push(novoLivro);
        res.statusCode = 201; 

        
        // respostra do navegador
        res.end(JSON.stringify({
            mensagem: "Livrop cadastrado com suceso", 
            livro: novoLivro
        }));
    });
return; 

   


}
});
server.listen(3000, () =>{
    console.log("Servidor diponível em: http://localhost:3000/livros")
});
