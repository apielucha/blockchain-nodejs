// @flow

import Account from '../../src/components/account';
import Block from '../../src/components/block';
import Blockchain from '../../src/components/blockchain';
import Transaction from '../../src/components/transaction';

describe('components/blockchain.mjs', () => {
  describe('class Blockchain', () => {
    describe('constructor()', () => {
      it('should initialize', () => {
        const { name, blocks, timestamp }: Blockchain = new Blockchain('name');

        expect(name).toBe('name');
        expect(blocks).toEqual([]);
        expect(typeof timestamp).toBe('number');
      });
    });

    describe('addBlock()', () => {
      it('should add a block to blocks list', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');
        await blockchain.addBlock(
          new Block('00000000000000000000000000000000'),
        );

        expect(blockchain.blocks.length).toBe(1);
      });
    });

    describe('addTransaction()', () => {
      it('should add a transaction to transactions list', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');
        await blockchain.addTransaction(
          new Transaction(10, new Account(), new Account()),
        );

        expect(blockchain.pendingTransactions.length).toBe(1);
      });
    });

    describe('addTransactions()', () => {
      it('should add transactions to transactions list', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');
        await blockchain.addTransactions([
          new Transaction(10, new Account(), new Account()),
          new Transaction(20, new Account(), new Account()),
          new Transaction(30, new Account(), new Account()),
        ]);

        expect(blockchain.pendingTransactions.length).toBe(3);
      });
    });

    describe('start()', () => {
      it('should start Blockchain', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');
        await blockchain.start();

        expect(blockchain.blocks.length).toBe(1);
      });

      it('should throw error if blocks not empty', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');
        await blockchain.start();

        await expect(blockchain.start()).rejects.toThrowError(
          "Can't start a non-empty Blockchain.",
        );
      });
    });

    describe('nextBlock()', () => {
      it('should generate and add next block', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');
        await blockchain.start();
        blockchain.pendingTransactions = [
          new Transaction(10, new Account(), new Account()),
          new Transaction(20, new Account(), new Account()),
          new Transaction(30, new Account(), new Account()),
        ];
        await blockchain.nextBlock();

        expect(blockchain.blocks.length).toBe(2);
      });

      it('should throw error if no previous block', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');

        await expect(blockchain.nextBlock()).rejects.toThrowError(
          'No previous block in Blockchain.',
        );
      });

      it('should throw error if no pending transactions', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');
        await blockchain.start();

        await expect(blockchain.nextBlock()).rejects.toThrowError(
          'No new transactions to add.',
        );
      });
    });

    describe('verify()', () => {
      it('should return true', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');

        const bl1 = new Block('00000000000000000000000000000000');
        const bl2 = new Block(await bl1.computeHash());
        const bl3 = new Block(await bl2.computeHash());

        blockchain.blocks.push(bl1, bl2, bl3);
        expect(blockchain.blocks.length).toBe(3);

        expect(await blockchain.verify()).toBe(true);
      });

      it('should throw error if blockchain corrupted', async () => {
        const blockchain: Blockchain = new Blockchain('Bitcoin');

        const bl1 = new Block('00000000000000000000000000000000');
        const bl2 = new Block('11111111111111111111111111111111');
        const bl3 = new Block('22222222222222222222222222222222');

        blockchain.blocks.push(bl1, bl2, bl3);
        expect(blockchain.blocks.length).toBe(3);

        await expect(blockchain.verify()).rejects.toThrowError(
          'Blockchain not valid!',
        );
      });
    });
  });
});
