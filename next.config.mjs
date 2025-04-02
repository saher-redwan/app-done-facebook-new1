/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Add a rule for audio files
    config.module.rules.push({
      test: /\.(wav|mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/sounds/",
          outputPath: "static/sounds/",
          name: "[name].[ext]",
        },
      },
    });

    return config;
  },
};

export default nextConfig;
