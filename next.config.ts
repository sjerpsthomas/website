import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
