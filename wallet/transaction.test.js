
const Transaction = require('./transaction');
const Wallet = require('./index');
const ChainUtil = require('../chain-util');


describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        recipient = 'r3c1p13nt-4ddr3ss';
        amount = 50;
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });


    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount);
    });

    it('inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    describe('when the amount exceeds the wallet balance', () => {
        beforeEach(() => {
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('does not create the transaction', () => {
            expect(transaction).toEqual(undefined);
        });

        
    });
});