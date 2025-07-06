const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Para resolver extensiones
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous',  // Está bien dejarlo, pero no es obligatorio si usas presets
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Tu plantilla HTML
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },
  mode: 'development',
};
