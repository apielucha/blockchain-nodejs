// @flow

import crypto from 'crypto';

import Transaction from './transaction';

class Block {
  id: string;
  transactions: Transaction[];
  previousHash: string;
  timestamp: number;

  constructor(previousHash: string = '') {
    this.id = crypto.randomBytes(32).toString('hex');
    this.transactions = [];
    this.previousHash = previousHash;
    this.timestamp = Date.now();
  }

  async computeHash(): Promise<string> {
    const hash = crypto.createHash('md5');

    hash.update(this.id);
    hash.update(this.transactions.toString());
    hash.update(this.previousHash);
    hash.update(this.timestamp.toString());

    return hash.digest('hex');
  }
}

export default Block;
