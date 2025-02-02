/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "images.pexels.com",  // Existing domain
            "cdn.sanity.io"       // Added Sanity domain
        ],
    },
};

export default nextConfig;
