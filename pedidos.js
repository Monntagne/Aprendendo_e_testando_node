const http = require('http')
 
let pedidos = [
    {
        id: "1",
        cliente: "jonathan",
        status: "pendente"
    },
    {
        id: "2",
        cliente: "Marcela",
        status: "pendente"
    }
]
 
const port = 3000
const hostname = "127.0.0.1"
 
const servidor = http.createServer((req, res) => {
 
    const url = req.url
    const method = req.method
 
    // GET
    if (url === "/pedidos" && method === "GET") {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
 
        res.end(JSON.stringify(pedidos))
        return
    }
 
    // POST
    if (url === "/pedidos" && method === "POST") {
 
        let body = ''
 
        req.on('data', parte => {
            body += parte
        })
 
        req.on('end', () => {
 
            const pedido = JSON.parse(body)
            pedidos.push(pedido)
            console.log(pedido)
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json')
 
            res.end(JSON.stringify({
                mensagem: "pedido cadastrado com sucesso",
                pedidos: pedido
            }))
        })
 
        return
    }
 
    if (url === "/pedidos" && method === "PUT") {
        let body = '';
        req.on('data', parte => {
            body += parte
        });
 
        req.on('end', () => {
 
            const pedidosPut = JSON.parse(body);
 
            pedidos = pedidos.map(pedido => {
                if (pedido.id === pedidosPut.id) {
                    return pedidosPut;
                }
                return pedido
                console.log(pedido, "chegou")
            })
 
            res.statusCode = 200;
 
            res.end(JSON.stringify({
                mensagem: "pedido atualizado com sucessl",
                pedidos: pedidos
            })
            )
 
 
        })
 
        return
    };
 
        if (url === '/pedidos' && method === 'DELETE') {
            let body = '';
         
            req.on('data', parte => {
                body += parte
            });
   
            req.on('end', () => {
                const pedido1 = JSON.parse(body);
   
                pedidos = pedidos.filter(pedido =>
                    pedido.id !== pedido1.id
   
                )
           
   
                res.statusCode = 200;
   
                res.end(JSON.stringify({
                    mensagem: "pedido deletado com sucesso",
                    pedidos: pedidos
                }))
            })
            return;
        };
 
    res.statusCode = 404
    res.end("Rota não encontrada")
 
})
 
servidor.listen(port, hostname, () => {
    console.log(`Servidor ON: http://${hostname}:${port}/`)
})
 