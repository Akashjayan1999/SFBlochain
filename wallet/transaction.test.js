
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

    it('validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates an invalid transaction', () => {
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
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


    describe('updating a transaction', () => {
        let nextAmount, nextRecipient;
        
        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'n3xt-r3c1p13nt-4ddr3ss';
            transaction.update(wallet, nextRecipient, nextAmount);
        });

        it(`subtracts the next amount from the sender's output`, () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(wallet.balance - amount - nextAmount);
        });

        it('outputs an amount to the next recipient', () => {
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
                .toEqual(nextAmount); 
        });

        it('validates the transaction', () => {
            expect(Transaction.verifyTransaction(transaction)).toBe(true);
        });
    });

    describe('creating a reward transaction', () => {
    });

});