const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuidV1 = require('uuid').v1;
class ChainUtil{
 static genKeyPair(){
    return ec.genKeyPair();
 }

static id(){
      return uuidV1();
   }
static hash(data){
      return SHA256(JSON.stringify(data)).toString();
  }
}


module.exports = ChainUtil;