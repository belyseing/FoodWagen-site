/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "your-production-domain.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "cdn.jsdelivr.net",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "images.pexels.com",
      "tse2.mm.bing.net",
      "encrypted-tbn0.gstatic.com",
      "images.immediate.co.uk",
      "www.google.com", 
      "word.cloud.microsoft", 
    ],
  },
}

module.exports = nextConfig