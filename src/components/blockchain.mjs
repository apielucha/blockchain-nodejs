// @flow

import Block from './block';

import type Transaction from './transaction';

class Blockchain {
  name: string;
  blocks: Block[];
  pendingTransactions: Transaction[];
  timestamp: number;

  constructor(name: string) {
    this.name = name;
    this.blocks = [];
    this.pendingTransactions = [];
    this.timestamp = Date.now();
  }

  async addBlock(block: Block) {
    this.blocks.push(block);
  }

  async addTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  async addTransactions(transactions: Transaction[]) {
    this.pendingTransactions.push(...transactions);
  }

  async start() {
    if (this.blocks.length !== 0) {
      throw new Error("Can't start a non-empty Blockchain.");
    }

    const genesis = new Block('00000000000000000000000000000000');
    await this.addBlock(genesis);
  }

  async nextBlock() {
    if (this.blocks.length === 0) {
      throw new Error('No previous block in Blockchain.');
    }

    if (this.pendingTransactions.length === 0) {
      throw new Error('No new transactions to add.');
    }

    const previousHash = await this.blocks[
      this.blocks.length - 1
    ].computeHash();
    const transactions = this.pendingTransactions.splice(0, 100);

    const block = new Block(previousHash);
    block.addTransactions(transactions);

    await this.addBlock(block);
  }

  async verify(): Promise<boolean> {
    await this.blocks.reduce(async (previousHash, bl) => {
      if (bl.previousHash !== (await previousHash)) {
        throw new Error('Blockchain not valid!');
      }

      return bl.computeHash();
    }, Promise.resolve('00000000000000000000000000000000'));

    return true;
  }
}

export default Blockchain;
