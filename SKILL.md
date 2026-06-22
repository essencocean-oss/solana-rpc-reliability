# Solana-RPC-Reliability

**Production-ready RPC health monitoring, automatic failover, and retry logic for Solana AI agents.**

## Overview
This skill solves a critical pain point for AI agents: unreliable RPC connections that cause failed transactions. It automatically monitors RPC health, switches to healthy nodes, and retries with exponential backoff.

## Features
- Real-time RPC health checking
- Automatic failover to healthy RPCs
- Intelligent retry logic with exponential backoff
- Easy integration with any Solana agent using Solana AI Kit
- Built with `@solana/web3.js` for reliability

## Installation

```bash
npm install