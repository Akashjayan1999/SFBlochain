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
});