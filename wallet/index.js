const {INITIAL_BALANCE} = require('../config');
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
class Wallet{
   constructor(){
    this.balance = INITIAL_BALANCE;
    this.keyPair=ChainUtil.genKeyPair();
    this.publicKey=this.keyPair.getPublic().encode('hex');

   } 

   toString(){
       return `Wallet -
         Public Key: ${this.publicKey.toString()}
         Balance   : ${this.balance}`;
         
         }

    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount,transactionPool) {
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds balance: ${this.balance}`);
            return;
        }
        let transaction = transactionPool.existingTransaction(this.publicKey);
        if (transaction) {
            transaction = transaction.update(this, recipient, amount);
            
        }else{
            transaction = Transaction.newTransaction(this, recipient, amount);
           
        }
        transactionPool.updateOrAddTransaction(transaction);
        return transaction;
    }

    static blockchainWallet(){
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;


    }

    calculateBalance(blockchain) {
        let balance  = this.balance;
        let transactions =[];
        blockchain.chan.forEach(block=> block.data.forEach(transactions=>{
            transactions.push(transaction);
        }));
      
        const walletInputTs = transactions.filter(transaction=>transaction.input.address === this.publicKey);
        let starttime =0;
        if(!walletInputTs.length) {
        const recentInputT = walletInputs.reduce((prev, current)=>
            prev.input.timestamp > current.input.timestamp ? prev : current)

         balance = recentInput.outputs.find(output => output.address === this.publicKey).amount;
         startTime = recentInput.input.timestamp;
       }
       
       transactions.forEach(transaction=>{
         if(transaction.input.timestamp > startTime){
            transaction.outputs.find(output=>{
                if(output.address === this.publicKey){
                    balance += output.amount;
                }
            });
         }
       });
       return balance;
      

    }
       
}

module.exports = Wallet;