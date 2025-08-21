const ChainUtil = require('../chain-util');
const {MINING_REWARD} = require('../config');
class Transaction{

    constructor(){
        this.input = null; 
        this.outputs = [];
        this.id = ChainUtil.id();
    }

    update(senderWallet, recipient, amount){
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);
        if(amount > senderWallet.balance){
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }
        senderOutput.amount = senderOutput.amount - amount; 
        this.outputs.push({ amount, address: recipient });

        Transaction.signTransaction(this, senderWallet);
        return this;
    }

    static trasactionWithOutputs(senderWallet, outputs){
         const transaction = new this();
         transaction.outputs.push(...outputs);
         Transaction.signTransaction(transaction, senderWallet);
         return transaction;
    }
   
    static newTransaction(senderWallet, recipient, amount){
       

        if(amount>senderWallet.balance){
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        return Transaction.trasactionWithOutputs(senderWallet,[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipient }
        ]);
       
    }

    static rewardTransaction(minerWallet, blockkChainWallet){
         return Transaction.trasactionWithOutputs(blockkChainWallet, [
            { amount: MINING_REWARD, address: minerWallet.publicKey }
        ]);
    }

    static signTransaction(transaction, senderWallet){
        transaction.input = {
            timeStamp: Date.now(),
            amount:senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        };

        
    }

    static verifyTransaction(transaction){
        return ChainUtil.verifySignature(
            transaction.input.address, 
            transaction.input.signature, 
            ChainUtil.hash(transaction.outputs));
    }

     
}

module.exports = Transaction;