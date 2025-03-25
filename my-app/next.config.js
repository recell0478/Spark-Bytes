// next.config.js

const path = require('path');

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      // Polyfill process and other Node.js globals for the client-side (browser) code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util/'),
      };
    }
    return config;
  },
};
