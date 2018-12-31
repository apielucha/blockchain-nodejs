// @flow

import Block from '../../src/components/block';

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
        const blo: Block = new Block('this_is_a_hash');

        expect(typeof (await blo.computeHash())).toBe('string');
      });
    });
  });
});
