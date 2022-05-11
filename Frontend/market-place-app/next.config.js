/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");

const assetPrefix = process.env.ASSET_PREFIX || "";

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            "@assetPrefix": assetPrefix || "''",
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "img.icons8.com", "picsum.photos"],
  },
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approac
  },
  modules: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};

module.exports = withPlugins(plugins, nextConfig);
