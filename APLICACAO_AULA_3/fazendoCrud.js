const http = require("http");

// Simula um "Banco de dados" em memória utilizando um array de objetos.
// Como ainda não existe conexão com banco de dados real,
// os livros ficam armazenados temporariamente na variável "livros".
// Toda vez que o servidor reiniciar, essas informações serão perdidas.
let livros = [
  { id: 1, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling" },
];

// Criação do servidor HTTP.
// O createServer fica "escutando" requisições vindas do navegador,
// Sempre que uma requisição chegar, a função (req, res) será executada.
const server = http.createServer((req, res) => {

  // req.method armazena qual método HTTP foi utilizado na requisição.
  // Exemplos:
  // GET    -> Buscar informações
  // POST   -> Criar informações
  // PUT    -> Atualizar informações
  // DELETE -> Remover informações
  const method = req.method;

  // req.url armazena a rota/endereço acessado pelo usuário.
  // Exemplo:
  // /livros
  const url = req.url;

  // Define o tipo de conteúdo que o servidor irá retornar.
  // "application/json" informa ao navegador que a resposta será em JSON.
  // Isso permite que APIs troquem informações de forma padronizada.
  res.setHeader("Content-Type", "application/json");





  // MÉTODO GET

  // O GET é utilizado para CONSULTAR/BUSCAR informações.
  // Nesse caso:
  // URL: /livros
  // Método: GET
  // Objetivo: retornar todos os livros cadastrados no array.
  if (url === "/livros" && method === "GET") {

    // Status HTTP 200 significa:
    // "Requisição realizada com sucesso"
    res.statusCode = 200;

    // JSON.stringify converte um objeto/array JavaScript
    // para o formato JSON.
    // APIs normalmente trabalham com JSON para troca de dados.
    res.end(JSON.stringify(livros));

    // O return encerra a execução da requisição atual.
    // Sem ele o código continuaria executando os próximos IFs.
    return;
  }

  // MÉTODO POST
  // O POST é utilizado para CADASTRAR/CRIAR informações.
  // Nesse caso:
  // URL: /livros
  // Método: POST
  // Objetivo: adicionar um novo livro no array.
  if (url === "/livros" && method === "POST") {

    // A variável body começa vazia.
    // Ela será utilizada para armazenar os dados enviados
    // pelo cliente durante a requisição.
    let body = "";

    // O req.on("data") é acionado sempre que uma parte da requisição chega.
    // Os dados podem chegar fragmentados/em partes.
    // Por isso precisamos juntar tudo manualmente.
    req.on("data", (parte) => {

      // Aqui concatenamos cada parte recebida na variável body.
      // Exemplo:
      // body = primeira parte
      // body = primeira parte + segunda parte
      // body = primeira parte + segunda + terceira...
      body += parte;
    });

    // O evento "end" significa que TODOS os dados foram recebidos.
    // Somente aqui podemos manipular o conteúdo completo da requisição.
    req.on("end", () => {

      // JSON.parse converte o JSON recebido
      // em um objeto JavaScript novamente.
      // Exemplo:
      // JSON -> Objeto JS
      const novoLivro = JSON.parse(body);

      // Adiciona o novo livro dentro do array.
      livros.push(novoLivro);

      // Status HTTP 201 significa:
      // "Recurso criado com sucesso"
      res.statusCode = 201;

      // Retorna uma resposta para o cliente informando
      // que o livro foi cadastrado.
      // Também retorna o livro criado.
      res.end(
        JSON.stringify({
          mensagem: "Livro cadastrado com suceso",
          livro: novoLivro,
        }),
      );
    });

    // Encerra o fluxo atual da requisição.
    return;
  }

  // MÉTODO PUT
  // O PUT é utilizado para ATUALIZAR informações já existentes.
  // Nesse caso:
  // URL: /livros
  // Método: PUT
  // Objetivo: atualizar um livro existente através do ID.
  if (url === "/livros" && method === "PUT") {

    // Variável responsável por armazenar os dados enviados.
    let body = "";

    // Recebe os dados fragmentados da requisição.
    req.on("data", (parte) => {

      // Junta cada fragmento recebido.
      body += parte;
    });

    // Executa quando todos os dados forem recebidos.
    req.on("end", () => {

      // Converte o JSON recebido em objeto JavaScript.
      const livroAtualizado = JSON.parse(body);

      // O map percorre todos os livros do array.
      // Ele cria um NOVO array baseado nas regras definidas.
      livros = livros.map((livro) => {

        // Verifica se o ID do livro atual
        // é igual ao ID recebido na requisição.
        if (livro.id === livroAtualizado.id) {

          // Se encontrar o mesmo ID,
          // substitui o livro antigo pelo atualizado.
          return livroAtualizado;
        }

        // Caso o ID seja diferente,
        // mantém o livro original sem alteração.
        return livro;
      });

      // Status HTTP 200 = sucesso.
      res.statusCode = 200;

      // Retorna uma mensagem de confirmação
      // junto com a lista atualizada de livros.
      res.end(
        JSON.stringify({
          mensagem: "Livro Atualizado!!",
          livros: livros,
        }),
      );
    });

    // Encerra a execução da requisição.
    return;
  }

// METODO DELETE 

// ALERTAS 

if(url === "/livros" && method ==="DELETE"){
    let body =''
    req.on('data', parte =>{
        body += parte;
    });

    req.on('end', () =>{
        const dados = JSON.parse(body)
        livros = livros.filter(livro => livro.id !== dados.id)
        console.log(dados)
        console.log(livros)
        res.statusCode = 200
        res.end(JSON. stringify({
            mensagem: 'Livro removido com sucesso!',
            livros: livros
        }));
    });
    return
};
res.statusCode = 404 //Erro 

res.end(JSON.stringify({
    mensagem: 'Rota não encontrada '
}));


});

// Faz o servidor iniciar na porta 3000.
// Após iniciar, ele ficará aguardando requisições.
// Exemplo de acesso:
// http://localhost:3000/livros
server.listen(3000, () => {

  // Mensagem exibida no terminal indicando
  // que o servidor iniciou corretamente.
  console.log("Servidor diponível em: http://localhost:3000/livros");
});