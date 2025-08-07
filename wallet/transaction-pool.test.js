const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
describe('TransactionPool', () => {
 let tp, wallet, transaction;
    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'r3c1p13nt-4ddr3ss', 50);
        tp.updateOrAddTransaction(transaction);
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
       
   
});