const Wallet = require('./index');
const Transaction = require('./transaction');
const TransactionPool = require('./transaction-pool');
const ChainUtil = require('../chain-util');
describe('Wallet', () => {
    let wallet, tp;
    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('creating a transaction', () => {
        let recipient, sendAmount, transaction;
        beforeEach(() => {
            recipient = 'r3c1p13nt-4ddr3ss';
            sendAmount = 50;
            transaction = wallet.createTransaction(recipient, sendAmount, tp);
        });

        describe('and doing the same transaction again', () => {
            beforeEach(() => {
             transaction = wallet.createTransaction(recipient, sendAmount, tp);
            });
            it(`doubles the 'sendAmount' subtracted from the wallet balance`, () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - (sendAmount * 2));
            });

            it('clones the `sendAmount` output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });
        });
    });

});
