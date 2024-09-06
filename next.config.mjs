/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['rfqbucket.s3-website-ap-southeast-2.amazonaws.com', 's3.ap-southeast-2.amazonaws.com']
  }
}

export default nextConfig
