import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true, // Enable MDX Rust compiler (required for Turbopack)
  },
  compiler: {
    // Enable the Next.js Compiler
    swc: true,
  },
}

export default withMDX(nextConfig)
