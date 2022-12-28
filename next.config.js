/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects () {
    return [
      {
        source: '/axios',
        destination: '/axios/1',
        permanent: true,
      },
      {
        source: '/react-query',
        destination: '/react-query/1',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
