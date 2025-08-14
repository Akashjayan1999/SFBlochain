class Miner{
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;

    }

    mine() {
       const validTransactions = this.transactionPool.validTransactions(); 
       //include a reward for the miner
       //create a blcok consisting of the valid trsnactions
       //sync the chains across the p2p network
       //clear the transaction pool
       //braodcast to every miner to clear their transaction pool
    }
}

module.exports = Miner;