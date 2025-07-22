const express = require('express');
const Block = require('../blockchain/block');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.HTTP_PORT || 3001;


const app = express();
app.use(bodyParser.json()); 
const bc = new Blockchain();

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