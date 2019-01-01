// @flow

import crypto from 'crypto';

class Account {
  id: string;
  balance: number;

  constructor() {
    this.id = crypto.randomBytes(32).toString('hex');
    this.balance = 0;
  }

  async updateBalance(diff: number): Promise<number> {
    if (this.balance + diff < 0) {
      throw new Error("Can't spend more than your balance.");
    }

    this.balance += diff;
    return this.balance;
  }

  async increaseBalance(diff: number): Promise<number> {
    if (diff <= 0) {
      throw new Error('Must increase balance by positive number.');
    }

    return this.updateBalance(diff);
  }

  async decreaseBalance(diff: number): Promise<number> {
    if (diff <= 0) {
      throw new Error('Must decrease balance by positive number.');
    }

    return this.updateBalance(-diff);
  }
}

export default Account;
