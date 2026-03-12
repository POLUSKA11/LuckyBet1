module.exports = {
  // Generate source maps only in development
  productionSourceMap: false,

  // Configure webpack for production
  configureWebpack: {
    performance: {
      hints: false
    }
  },

  // Dev server proxy (for local development only)
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BACKEND_URL || 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
};
