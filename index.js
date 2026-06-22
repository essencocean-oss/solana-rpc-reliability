const { Connection, clusterApiUrl } = require('@solana/web3.js');

class SolanaRPCReliability {
  constructor(options = {}) {
    this.rpcList = options.rpcs || [
      { url: clusterApiUrl('devnet'), name: 'devnet', weight: 1 },
      { url: clusterApiUrl('mainnet-beta'), name: 'mainnet-beta', weight: 1 }
    ];
    this.currentIndex = 0;
    this.maxRetries = options.maxRetries || 3;
    console.log('✅ Solana-RPC-Reliability v1.0.1 loaded');
  }

  getCurrentConnection() {
    return new Connection(this.rpcList[this.currentIndex].url, 'confirmed');
  }

  async isHealthy(connection) {
    try {
      await connection.getSlot();
      return true;
    } catch (e) {
      return false;
    }
  }

  async switchToHealthyRpc() {
    for (let i = 0; i < this.rpcList.length; i++) {
      this.currentIndex = (this.currentIndex + 1) % this.rpcList.length;
      const conn = this.getCurrentConnection();
      if (await this.isHealthy(conn)) {
        console.log(`Switched to healthy RPC: ${this.rpcList[this.currentIndex].name}`);
        return true;
      }
    }
    console.log("⚠️ All RPCs unhealthy");
    return false;
  }

  async sendWithRetry(rawTransaction, maxAttempts = null) {
    const attempts = maxAttempts || this.maxRetries;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const conn = this.getCurrentConnection();
        const signature = await conn.sendRawTransaction(rawTransaction, { skipPreflight: true });
        console.log(`✅ Transaction sent (attempt ${attempt}): ${signature}`);
        return signature;
      } catch (error) {
        console.log(`Attempt ${attempt} failed: ${error.message}`);
        await this.switchToHealthyRpc();
        if (attempt < attempts) {
          await new Promise(r => setTimeout(r, 800 * attempt));
        }
      }
    }
    console.log("❌ All retry attempts failed");
    return null;
  }
}

module.exports = SolanaRPCReliability;

// Auto test when run directly
if (require.main === module) {
  const skill = new SolanaRPCReliability();
  console.log("Ready for use in AI agents. Example: skill.sendWithRetry(tx)");
}