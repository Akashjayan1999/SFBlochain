
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet/index');
class Miner{
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;

    }

    mine() {
       const validTransactions = this.transactionPool.validTransactions(); 
       console.log(`Valid transactions: ${validTransactions.toString()}`);
       validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
       console.log(`Reward transaction: ${validTransactions[validTransactions.length - 1].toString()}`);
       const block = this.blockchain.addBlock(validTransactions);
       this.p2pServer.syncChains();
       this.transactionPool.clear();
       this.p2pServer.broadcastClearTransactions();
       //include a reward for the miner
       //create a blcok consisting of the valid trsnactions
       //sync the chains across the p2p network
       //clear the transaction pool
       //braodcast to every miner to clear their transaction pool
       return block;
    }
}

module.exports = Miner;