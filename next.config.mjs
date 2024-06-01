/** @type {import('next').NextConfig} */ import withPWAInit from 'next-pwa'
const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

export default withPWA({
  // next.js config
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-stag.esollabs.com',
        port: '',
        pathname: '/quiz_on_chain/**',
      },
    ],
  },
})
