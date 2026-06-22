const config = require('./config.json');

module.exports = {
    start: () => {
        console.log('Starting Solana-Defender skill...');
        console.log('Connected to RPC:', config.rpcUrls);
        // Add real logic here later
    },
    stop: () => {
        console.log('Stopping Solana-Defender skill...');
    },
    getPosition: () => {
        console.log('Getting current position...');
        // Add logic later
    }
};

console.log('Solana-Defender loaded successfully!');