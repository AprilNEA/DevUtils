/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.fallback = {
      // url: require.resolve('url/'),
      // path: require.resolve('path-browserify'),
      fs: false,
    };
    config.experiments = {
      layers: true,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
