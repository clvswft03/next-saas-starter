const bundleAnalyzer = require('@next/bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['github.blog'],
    deviceSizes: [320, 640, 1080, 1200],
    imageSizes: [64, 128],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = {
      global: true,
    };

    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: require.resolve('stream-browserify'),
      // stream: false,
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    );

    if (!dev) {
      config.plugins.push(
        new CopyPlugin({ patterns: [{ from: 'src/posts', to: 'src/posts' }] }),
      );
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: [{ loader: '@svgr/webpack' }, { loader: 'url-loader' }],
    });

    return config;
  },
});
