const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Order = require('./Order');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let orders = [];
let viewOrder = {};

app.get('/api/orders', (req,res) => {
    console.log('-----------------------------------------------------------------------')
    console.log('========> INICIO get all')
    console.log( req.params );
    res.json(orders);
});

app.get('/api/orders/:id', (req,res) => {
    
    const orderId = req.params.id;

    console.log('-----------------------------------------------------------------------')
    console.log('========> INICIO get id')
    console.log( req.params );
    console.log('========> orders ')

    orders.forEach(order => {
        console.log( order );    
    });
    console.log('========> orders filtrado 1 ')

    viewOrder = orders.find(order => order.id === orderId);

    console.log( viewOrder );    

    console.log('========> orders filtrado 2')

    
    orders = orders.map(order => order.id === orderId ? viewOrder : order);
    console.log( viewOrder );    

    res.json(viewOrder);
});

app.post('/api/orders', (req,res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    res.json(newOrder);
});

app.put('/api/orders/:id', (req,res) => {
    console.log('-----------------------------------------------------------------------')
    console.log('====================>>> PUT ')

    const orderId = req.params.id;
    const updateOrder = req.body;
    console.log('========> INICIO  orderId' + updateOrder)
    console.log( orderId );

    orders = orders.map(order => order.id === orderId ? updateOrder : order );
    res.json(updateOrder);
});

app.delete('/api/orders/:id', (req,res) => {
    const orderId = req.params.id;
    const updateOrder = req.body;
    orders = orders.filter(order => order.id !== orderId );
    res.json({ message: 'Pedido excluido com sucesso!'});
});

// ----------------------------------------------------------------------

app.post('/api/v2/orders', async(req, res) =>{
    try {
        const { title, description, uuid, selected } = req.body;

        console.log('post v2 -> uuid:' + uuid);

        const order = await Order.create({ title, description, uuid, selected });

        res.status(200).json(order);
    } catch (error) {
        console.error('Erro ao criar o pedido: ', error);
        res.status(500).send("Erro ao criar o pedido");
    }
});


app.get('/api/v2/orders', async (req,res) => {
    console.log('-----------------------------------------------------------------------')
    console.log('========> INICIO get all v2')

    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch ( error ) {
        console.error('Erro ao obter pedidos', error);
        res.status(500);
    }
});

app.get('/api/v2/order/:orderId', async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findByPk(orderId);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: 'Pedido não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter o pedido:', error);
      res.status(500).json({ error: 'Erro ao obter o pedido' });
    }
  });
  
const port = 3000;

app.listen( port, () => {
    console.log('Servidor rodando em http://localhost:'+ port);
});
