module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/sistema/' : '/',
  devServer: {
    proxy: 'http://10.0.0.104/',
  }
};



