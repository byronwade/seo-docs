'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Breadcrumb() {
  const pathname = usePathname()
  const slug = pathname.split('/').filter((segment) => segment !== '')

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    ...slug.map((segment, index) => {
      if (index === 0 && segment === 'home') {
        return null
      }
      return {
        title: segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        href: `/${slug.slice(0, index + 1).join('/')}`,
      }
    }).filter(Boolean),
  ]

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("mb-4 flex items-center space-x-1 text-sm text-muted-foreground", {
        'invisible': pathname === '/',
      })}
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === breadcrumbItems.length - 1 ? (
            <span className="font-medium text-foreground">{item?.title}</span>
          ) : (
            <Link href={item?.href ?? '#'} className="hover:text-foreground">
              {item?.title}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
