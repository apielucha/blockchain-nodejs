// @flow

import Account from '../../src/components/account';
import Block from '../../src/components/block';
import Transaction from '../../src/components/transaction';

describe('components/block.mjs', () => {
  describe('class Block', () => {
    describe('constructor()', () => {
      it('should initialize', () => {
        const { id, transactions, previousHash, timestamp }: Block = new Block(
          'this_is_a_hash',
        );

        expect(typeof id).toBe('string');
        expect(transactions).toEqual([]);
        expect(previousHash).toBe('this_is_a_hash');
        expect(typeof timestamp).toBe('number');
      });

      it('should initialize with no parameter', () => {
        const {
          id,
          transactions,
          previousHash,
          timestamp,
        }: Block = new Block();

        expect(typeof id).toBe('string');
        expect(transactions).toEqual([]);
        expect(previousHash).toBe('');
        expect(typeof timestamp).toBe('number');
      });
    });

    describe('computeHash()', () => {
      it('should return computed hash', async () => {
        const block: Block = new Block('this_is_a_hash');

        expect(typeof (await block.computeHash())).toBe('string');
      });
    });

    describe('addTransaction()', () => {
      it('should add a transaction to transactions list', async () => {
        const block: Block = new Block('this_is_a_hash');
        await block.addTransaction(
          new Transaction(10, new Account(), new Account()),
        );

        expect(block.transactions.length).toBe(1);
      });
    });

    describe('addTransactions()', () => {
      it('should add transactions to transactions list', async () => {
        const block: Block = new Block('this_is_a_hash');
        await block.addTransactions([
          new Transaction(10, new Account(), new Account()),
          new Transaction(20, new Account(), new Account()),
          new Transaction(30, new Account(), new Account()),
        ]);

        expect(block.transactions.length).toBe(3);
      });
    });
  });
});
