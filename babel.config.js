module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: false,
        modules: false,
        exclude: [
          '@babel/plugin-transform-async-to-generator',
          '@babel/plugin-transform-regenerator',
        ],
        useBuiltIns: 'entry',
        corejs: '3.19',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
    'next/babel',
  ],
  plugins: [
    // WARN: Order Matters
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-runtime', { helpers: true }],
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
  ],
};
