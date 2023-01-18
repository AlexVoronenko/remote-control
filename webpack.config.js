// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import process from 'node:process';

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './src/index.ts',
  target: ['node'],
  output: {
    chunkFormat: 'module',
    filename: 'index.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  experiments: {
    outputModule: true,
  },
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
