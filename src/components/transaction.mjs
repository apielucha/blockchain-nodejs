// @flow

import crypto from 'crypto';

import type Account from './account';

class Transaction {
  id: string;
  amount: number;
  sender: Account;
  receiver: Account;
  timestamp: number;

  constructor(amount: number, from: Account, to: Account) {
    this.id = crypto.randomBytes(32).toString('hex');
    this.amount = amount;
    this.sender = from;
    this.receiver = to;
    this.timestamp = Date.now();
  }

  async verify(): Promise<boolean> {
    return this.sender.balance >= this.amount;
  }
}

export default Transaction;
