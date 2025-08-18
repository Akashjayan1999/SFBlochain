const Transaction = require('./transaction');
class TransactionPool {
    
    constructor() {
        this.transactions = [];
    }
    
   updateOrAddTransaction(transaction) {
        let transactiionWithId = this.transactions.find(t => t.id === transaction.id);
        if (transactiionWithId) {
            this.transactions[this.transactions.indexOf(transactiionWithId)] = transaction;
            console.log(`Updated transaction with id: ${transaction.id}`);
        } else {
            this.transactions.push(transaction);
        }
   }



   existingTransaction(address) {
        return this.transactions.find(t=>t.input.address === address);
    }

    validTransactions() {
        return this.transactions.filter(transaction=>{
            const outputTotal = transaction.outputs.reduce((total, output) => total + output.amount, 0);
            if(transaction.input.amount !== outputTotal){
                console.log(`invalid transaction from the ${transaction.input.address} address`);
                return;
            }

            if(!Transaction.verifyTransaction(transaction)){
                console.log(`invalid signature from the ${transaction.input.address} address`);
                return;
            }
            return transaction;
        });
    }

    clear(){
        this.transactions = [];
    }


}

module.exports = TransactionPool;