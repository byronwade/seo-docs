'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function PageForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    contentTypeId: '',
    author: '',
    description: '',
    image: '',
    keywords: [],
    seoTitle: '',
    seoDescription: '',
    seoImage: '',
    date: new Date().toISOString().split('T')[0], // Set default to today's date
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create page')
      }
      const data = await response.json()
      console.log('Page created:', data)
      // Reset form or redirect user
    } catch (error) {
      console.error('Error creating page:', error)
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Page Title"
        required
      />
      <Textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Page Content"
        required
      />
      <Input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="Slug"
        required
      />
      {/* Add more fields for author, description, image, keywords, SEO fields, etc. */}
      <Select
        name="contentTypeId"
        value={formData.contentTypeId}
        onChange={handleChange}
        required
      >
        <option value="">Select Content Type</option>
        {contentTypes.map((type) => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </Select>
      {submitError && <div className="text-red-500">{submitError}</div>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Page'}
      </Button>
    </form>
  )
}
