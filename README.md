# Blockchain NodeJS

## Goal

Implement our own custom Blockchain from scratch, in order to understand how it works and what blockchains can be used for.

## What is a Blockchain ?

A Blockchain is a distributed and decentralized ledger, where transactions are included in blocks created by a network, then chained to form the Blockchain.

## Specifications

### Features

-   The **Blockchain** is composed of **Blocks**.
-   Each block contains a list of **Transactions**.
-   Transactions are composed of at least a sender account id, a receiver account id, and the amount of the transaction.
-   An **Account** is a user of the Blockchain network.
    Blocks are created (also called "mined") by **Nodes** that enable the Blockchain. The nodes constitute the Blockchain network.
-   Every single node in the network contains the whole Blockchain data, from the **Genesis** block (very first block in the Blockchain).
-   Transactions are verified, then batched and grouped together by nodes to constitute a block. When a node completes a new block, the result is shared with other nodes in order to verify the transactions included in it.
-   The system validates data on 2 levels, to ensure data consistency in the Blockchain and in the network:
    -   Inside each node, a verifier algorithm computes the whole chain to verify that locally stored data has not been altered.
    -   On the network, a consensus algorithm detects when a node is corrupted, eliminates its data and updates it with the correct data. Furthermore, it should be able to determine whether the newly created block should be dispatched to the whole network.

### Technos

-   Nodes on the network are virtual containers created by **Docker**. This allows easy addition or deletion of nodes from the network, by simply launching a new container or closing one.
-   Docker containers each contain a **NodeJS application** (that executes the code needed to make the Blockchain live) and **internal storage** (to store the Blockchain).
-   The NodeJS application needs to expose an **API** in order for users to communicate with it.
