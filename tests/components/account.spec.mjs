// @flow

import Account from '../../src/components/account';

describe('components/account.mjs', () => {
  describe('class Account', () => {
    describe('constructor()', () => {
      it('should initialize', () => {
        const { id }: Account = new Account();

        expect(id).toBeDefined();
        expect(typeof id).toBe('string');
      });
    });

    describe('updateBalance()', () => {
      it('should update balance', async () => {
        const acc: Account = new Account();

        await acc.updateBalance(10);
        expect(acc.balance).toBe(10);
        await acc.updateBalance(-7);
        expect(acc.balance).toBe(3);
      });

      it('should throw error if trying to spend more than balance', async () => {
        const acc: Account = new Account();

        await expect(acc.updateBalance(-5)).rejects.toThrowError(
          "Can't spend more than your balance.",
        );
      });
    });

    describe('increaseBalance()', () => {
      it('should increase balance', async () => {
        const acc: Account = new Account();

        await acc.increaseBalance(10);
        expect(acc.balance).toBe(10);
      });

      it('should throw error if increasing by negative number', async () => {
        const acc: Account = new Account();

        await expect(acc.increaseBalance(-5)).rejects.toThrowError(
          'Must increase balance by positive number.',
        );
      });
    });

    describe('decreaseBalance()', () => {
      it('should decrease balance', async () => {
        const acc: Account = new Account();

        acc.balance = 10;
        await acc.decreaseBalance(7);
        expect(acc.balance).toBe(3);
      });

      it('should throw error if increasing by negative number', async () => {
        const acc: Account = new Account();

        await expect(acc.decreaseBalance(-5)).rejects.toThrowError(
          'Must decrease balance by positive number.',
        );
      });

      it('should throw error if trying to spend more than balance', async () => {
        const acc: Account = new Account();

        await expect(acc.decreaseBalance(7)).rejects.toThrowError(
          "Can't spend more than your balance.",
        );
      });
    });
  });
});
