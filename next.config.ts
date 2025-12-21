import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/서재",
        destination: "/library",
        permanent: true,
      },
      {
        source: "/%EC%84%9C%EC%9E%AC",
        destination: "/library",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        // customize default plugin options
                        removeViewBox: false,
                      },
                    },
                  },
                  "removeDimensions",
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
