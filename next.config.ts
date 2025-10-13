import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'], // ⭐ 이것만 추가
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
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
