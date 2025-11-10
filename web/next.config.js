/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Generate sitemap and robots.txt
  async generateBuildId() {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig


