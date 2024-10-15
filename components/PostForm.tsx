'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

export function PostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')
  const [contentTypeId, setContentTypeId] = useState('')
  const [contentTypes, setContentTypes] = useState([])

  useEffect(() => {
    fetch('/api/content-types')
      .then(res => res.json())
      .then(data => setContentTypes(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, slug, contentTypeId }),
    })
    if (response.ok) {
      setTitle('')
      setContent('')
      setSlug('')
      setContentTypeId('')
      // Optionally, trigger a refresh of the content list
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        required
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        required
      />
      <Input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
        required
      />
      <Select
        value={contentTypeId}
        onValueChange={setContentTypeId}
        required
      >
        <option value="">Select Content Type</option>
        {contentTypes.map((type) => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </Select>
      <Button type="submit">Create Post</Button>
    </form>
  )
}

