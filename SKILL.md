# Solana-RPC-Reliability

**Production-ready RPC health monitoring, automatic failover, and retry logic for Solana AI agents.**

## Overview
This skill solves a critical pain point for autonomous AI agents on Solana: unreliable RPC connections that cause failed transactions. It automatically monitors RPC health, switches to healthy nodes, and retries with exponential backoff.

## Features
- Real-time RPC health checking using `getSlot()`
- Automatic failover to healthy RPCs
- Intelligent retry logic with exponential backoff
- Built with `@solana/web3.js` for reliability
- Easy to integrate into any agent using Solana AI Kit

## Installation

```bash
npm install