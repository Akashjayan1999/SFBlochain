const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for(let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const prevBlock = chain[i - 1];
            if(block.lastHash !== prevBlock.hash|| block.hash !== Block.blockHash(block)) {
                return false;
            }
           
        }
        return true;
    }

     replaceChain(newChain){
            if(newChain.length <= this.chain.length) {
                console.log('Received chain is not longer than the current chain.');
                return;
            }
            if(!this.isValidChain(newChain)) {
                console.log('Received chain is not valid.');
                return;
            }
            console.log('Replacing chain with new chain.');
            this.chain = newChain;
        }
}

module.exports = Blockchain;