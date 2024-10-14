import React from 'react'

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
        <div>
            <h1>Blog Page</h1>
            {children}
        </div>
  )
}

export default BlogLayout