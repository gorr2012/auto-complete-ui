const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

let conf = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options:
            {
              presets: ['@babel/preset-env']
            }
        },
        {
          loader: 'ts-loader'
        }
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        "postcss-loader",
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                ],
              ],
            },
          },
        },
        {
          loader: 'sass-loader'
        }
      ]
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf)$/i,
      type: 'asset/resource',
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'auto-complete-ui/public',
          to: path.resolve(__dirname, 'dist/public'),
          noErrorOnMissing: true
        },
      ],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
  },
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
  conf.target = isProd ? 'browserslist' : 'web';
  return conf;
};
