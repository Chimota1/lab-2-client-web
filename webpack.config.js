const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагін для роботи з вашим public/index.html

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Підключаємо ваш статичний HTML
      favicon: './public/favicon.ico', // Підключаємо ваш favicon
    }),
  ],
  devServer: {
    static: './public',
    port: 9000,
    hot: true,
  },
};