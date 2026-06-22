const { Connection, clusterApiUrl } = require('@solana/web3.js');

class SolanaRPCReliability {
  constructor(options = {}) {
    this.rpcList = options.rpcs || [
      { url: clusterApiUrl('devnet'), name: 'devnet' },
      { url: clusterApiUrl('mainnet-beta'), name: 'mainnet-beta' }
    ];
    this.currentIndex = 0;
    console.log('✅ Solana-RPC-Reliability skill loaded');
  }

  getCurrentConnection() {
    return new Connection(this.rpcList[this.currentIndex].url, 'confirmed');
  }

  async switchToHealthyRpc() {
    for (let i = 0; i < this.rpcList.length; i++) {
      this.currentIndex = (this.currentIndex + 1) % this.rpcList.length;
      try {
        const conn = this.getCurrentConnection();
        await conn.getSlot();
        console.log(`Switched to healthy RPC: ${this.rpcList[this.currentIndex].name}`);
        return true;
      } catch (e) {}
    }
    return false;
  }

  async sendWithRetry(rawTransaction, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const conn = this.getCurrentConnection();
        const signature = await conn.sendRawTransaction(rawTransaction);
        console.log(`Transaction sent successfully: ${signature}`);
        return signature;
      } catch (error) {
        console.log(`Attempt ${attempt} failed. Retrying...`);
        await this.switchToHealthyRpc();
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
    console.log("All retry attempts failed");
    return null;
  }
}

module.exports = SolanaRPCReliability;

// Test when running directly
if (require.main === module) {
  const skill = new SolanaRPCReliability();
  console.log("Ready for use in AI agents");
}