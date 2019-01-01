// @flow

import Account from '../../src/components/account';
import Transaction from '../../src/components/transaction';

describe('components/transaction.mjs', () => {
  describe('class Transaction', () => {
    describe('constructor()', () => {
      it('should initialize', () => {
        const {
          id,
          amount,
          sender,
          receiver,
          timestamp,
        }: Transaction = new Transaction(10, new Account(), new Account());

        expect(typeof id).toBe('string');
        expect(amount).toBe(10);
        expect(sender).toBeInstanceOf(Account);
        expect(receiver).toBeInstanceOf(Account);
        expect(typeof timestamp).toBe('number');
      });
    });

    describe('verify()', () => {
      it('should return false', async () => {
        const acc1: Account = new Account();
        const acc2: Account = new Account();
        const tran: Transaction = new Transaction(10, acc1, acc2);

        expect(await tran.verify()).toBe(false);
      });

      it('should return true', async () => {
        const acc1: Account = new Account();
        acc1.balance = 10;
        const acc2: Account = new Account();
        const tran: Transaction = new Transaction(10, acc1, acc2);

        expect(await tran.verify()).toBe(true);
      });
    });
  });
});
