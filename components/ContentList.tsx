'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function ContentList({ type }) {
  const [content, setContent] = useState([])

  useEffect(() => {
    fetch(`/api/${type}`)
      .then(res => res.json())
      .then(data => setContent(data))
  }, [type])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title/Name</TableHead>
          <TableHead>Slug</TableHead>
          {type !== 'content-types' && <TableHead>Content Type</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {content.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title || item.name}</TableCell>
            <TableCell>{item.slug}</TableCell>
            {type !== 'content-types' && <TableCell>{item.contentType.name}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

