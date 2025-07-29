const Block = require('./block');

describe('Block', () => {
    let data,lastBlock,block;

    beforeEach(() => {
         data = 'bar';
         lastBlock = Block.genesis();
         block = Block.mineBlock(lastBlock,data);
    });

    it('sets the `data` to match the input', () => {
        expect(block.data).toBe(data);
    });

    it('sets the `lastHash` to match the hash of the previous block', () => {
        expect(block.lastHash).toBe(lastBlock.hash);
    });

    it('generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
        // console.log(block.toString());
    });

    it('lower the difficulty for slow mining', () => {
        expect(Block.adjustDifficulty(lastBlock, lastBlock.timestamp + 3600000)).toBe(lastBlock.difficulty - 1);
    });

    it('raises the difficulty for quickly mining blocks', () => {
        expect(Block.adjustDifficulty(lastBlock, lastBlock.timestamp + 1)).toBe(lastBlock.difficulty + 1);
    });
}); 