const express = require('express');
const Block = require('../blockchain/block');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;


const app = express();
app.use(bodyParser.json()); 
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});



app.post('/mine', (req, res) => {
    const data = req.body.data;
    const block = bc.addBlock(data);
    console.log(`New block added: ${block.toString()}`);
    res.redirect('/blocks');
});


app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
}); 
p2pServer.listen();