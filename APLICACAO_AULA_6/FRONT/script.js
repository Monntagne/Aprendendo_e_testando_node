// Função responsável por buscar os pedidos na API e exibir na tela
function listarPedidos(){
    //Busca no HTML o elemento onde a lista será exxibida
    const lista =document.getElementById("lista");
    
    // Limpa a lista antes de exibir os pedidos. 
    lista.innerHTML = "Carregando pedidos...";

    //Aqui vai a URL precisa substituir xxxx pela URL 
    //Faz a requisição GET para a API com a URL dela publicada (ou local)
    fetch(xxxx)

    //Converte a resposta da API para JSON 
    .then(res => res.JSON())

    //Vamos trabalhar com o resultado da API
    .then(resultado =>{
        
        //Limpando a lisra para preecher com os pedidos 
        lista.innerHTML = "";
        
        //Percorrendo o array de pedidos recebido da API 
        resultado.dados.forEach(pedido => {
            
            // Cria um item de lista para cada pedido 
            const item = document.createElement("li");

            //Definindo como o texto será exibido na tela
            item.textContent = 
            `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status} `;
        
            //Adiconando item criado 
            lista.appendChild(item);
        });
        
  
    })
    //Caso o front não consiga acesaar a API para trazer os dados 
    .catch(() =>{
        lista.innerHTML = "Erro ao carregar pedidos" 
    })
};