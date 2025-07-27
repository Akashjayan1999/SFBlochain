const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp,lastHash,hash,data,nonce,difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY; // Default to DIFFICULTY if not provided
    }


    toString() {
        return `Block -
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0,10).substring(0,10)}
        Hash      : ${this.hash.substring(0,10).substring(0,10)}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Data      : ${this.data}`;  
    }

    static genesis(){
        return new this('Geneis time','-----','f1r57-h45h',[],0, DIFFICULTY);
    }

    static mineBlock(lastBlock,data){
        let hash,timestamp;
        const lastHash = lastBlock.hash;
        const {difficulty} = lastBlock;
        let nonce =0;
        do{
            
             nonce++;
             timestamp = Date.now();
             difficulty = Block.adjustDifficulty(lastBlock,timestamp);
             hash = Block.hash(timestamp,lastHash,data,nonce,difficulty);
            
        }while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp,lastHash,hash,data,nonce,difficulty);
    }

    static hash(timestamp,lastHash,data,nonce,difficulty){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();

    }


    static blockHash(block){
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp,lastHash,data,nonce);
    }

    static adjustDifficulty(lastBlock,timestamp){
        const { difficulty } = lastBlock;
       difficulty = lastBlock.timestamp + MINE_RATE > timestamp ? difficulty + 1 : difficulty - 1;
        return difficulty < 1 ? 1 : difficulty; // Ensure difficulty does not go below 1
    }


}



module.exports = Block;