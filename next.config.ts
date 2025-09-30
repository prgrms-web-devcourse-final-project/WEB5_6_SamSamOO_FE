import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    },
                  },
                ],
              },
              typescript: true,
              replaceAttrValues: {
                '#EDEDED': 'currentColor',
                '#000000': 'currentColor',
                '#000': 'currentColor',
                '#fff': 'currentColor',
                '#ffffff': 'currentColor',
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
