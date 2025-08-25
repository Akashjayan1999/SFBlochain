const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');
describe('TransactionPool', () => {
 let tp, wallet, transaction, bc;
    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        bc = new Blockchain();
        // transaction = Transaction.newTransaction(wallet, 'r3c1p13nt-4ddr3ss', 50);
        // tp.updateOrAddTransaction(transaction);
        transaction = wallet.createTransaction('r3c1p13nt-4ddr3ss', 50 ,bc, tp);
    });

    it('adds a transaction to the pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
       const newTransaction =  transaction.update(wallet, 'foo-4ddr3ss', 40);
         tp.updateOrAddTransaction(transaction);
        expect(tp.transactions.find(t => t.id === transaction.id).outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - 50 - 40);
           
          expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
        }); 
    
    it('clear transactions', () => {
        tp.clear();
        expect(tp.transactions).toEqual([]);
    });
   
    describe('mixing valid and corrupted transactions', () => {
      let validTransactions
      beforeEach(() => {
          validTransactions = [...tp.transactions];

          for(let i = 0; i < 6; i++){
            wallet = new Wallet();
            transaction = wallet.createTransaction('r3c1p13nt-4ddr3ss', 30, bc, tp);
            if(i % 2 === 0){
                transaction.input.amount = 99999; // Corrupting the transaction
            } else {
                validTransactions.push(transaction);
            }
          }
      });

      it('show a difference between valid and corrupted transactions', () => {
        expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });

    it('grabs valid transactions', () => {
        expect(tp.validTransactions()).toEqual(validTransactions);
    });
});
 });