/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.start.gg' },
      { protocol: 'https', hostname: 'images.smash.gg' },
    ],
  },
};
