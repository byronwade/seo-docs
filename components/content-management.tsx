'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'

// Dynamically import the markdown editor to avoid SSR issues
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

// Mock data and functions
const mockContentTypes = [
  { id: 1, name: 'Blog Post', slug: 'blog-post' },
  { id: 2, name: 'News Article', slug: 'news-article' },
]

const mockPages = [
  { id: 1, title: 'About Us', slug: 'about-us', contentTypeId: 1, content: '# About Us\n\nWelcome to our company!' },
  { id: 2, title: 'Contact', slug: 'contact', contentTypeId: 2, content: '# Contact Us\n\nGet in touch with us today!' },
]

const mockPosts = [
  { id: 1, title: 'First Blog Post', slug: 'first-blog-post', contentTypeId: 1, content: '# First Blog Post\n\nThis is our first blog post.' },
  { id: 2, title: 'Breaking News', slug: 'breaking-news', contentTypeId: 2, content: '# Breaking News\n\nImportant announcement!' },
]

const mockCreateEntry = (type, data) => console.log(`Creating ${type}:`, data)
const mockUpdateEntry = (type, id, data) => console.log(`Updating ${type} ${id}:`, data)
const mockDeleteEntry = (type, id) => console.log(`Deleting ${type} ${id}`)

export function ContentManagementComponent() {
  const [activeTab, setActiveTab] = useState('content-types')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEditorChange = ({ text }) => {
    setFormData({ ...formData, content: text })
  }

  const handleSubmit = (type) => {
    if (editingId) {
      mockUpdateEntry(type, editingId, formData)
    } else {
      mockCreateEntry(type, formData)
    }
    setFormData({})
    setEditingId(null)
  }

  const handleEdit = (type, id) => {
    setEditingId(id)
    setFormData(type === 'content-types' ? mockContentTypes.find(ct => ct.id === id) :
                type === 'pages' ? mockPages.find(p => p.id === id) :
                mockPosts.find(p => p.id === id))
  }

  const handleDelete = (type, id) => {
    mockDeleteEntry(type, id)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content Management System</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content-types">Content Types</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="content-types">
          <h2 className="text-xl font-semibold mb-2">Content Types</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit('content-types') }} className="space-y-4 mb-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" value={formData.slug || ''} onChange={handleInputChange} required />
            </div>
            <Button type="submit">{editingId ? 'Update' : 'Create'} Content Type</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContentTypes.map((ct) => (
                <TableRow key={ct.id}>
                  <TableCell>{ct.name}</TableCell>
                  <TableCell>{ct.slug}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit('content-types', ct.id)} className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('content-types', ct.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="pages">
          <h2 className="text-xl font-semibold mb-2">Pages</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit('pages') }} className="space-y-4 mb-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title || ''} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" value={formData.slug || ''} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <MdEditor
                style={{ height: '300px' }}
                value={formData.content || ''}
                onChange={handleEditorChange}
                renderHTML={(text) => text}
              />
            </div>
            <div>
              <Label htmlFor="contentTypeId">Content Type</Label>
              <Select name="contentTypeId" value={formData.contentTypeId?.toString() || ''} onValueChange={(value) => handleInputChange({ target: { name: 'contentTypeId', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a content type" />
                </SelectTrigger>
                <SelectContent>
                  {mockContentTypes.map((ct) => (
                    <SelectItem key={ct.id} value={ct.id.toString()}>{ct.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">{editingId ? 'Update' : 'Create'} Page</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Content Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  <TableCell>{mockContentTypes.find(ct => ct.id === page.contentTypeId)?.name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit('pages', page.id)} className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('pages', page.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="posts">
          <h2 className="text-xl font-semibold mb-2">Posts</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit('posts') }} className="space-y-4 mb-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title || ''} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" value={formData.slug || ''} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <MdEditor
                style={{ height: '300px' }}
                value={formData.content || ''}
                onChange={handleEditorChange}
                renderHTML={(text) => text}
              />
            </div>
            <div>
              <Label htmlFor="contentTypeId">Content Type</Label>
              <Select name="contentTypeId" value={formData.contentTypeId?.toString() || ''} onValueChange={(value) => handleInputChange({ target: { name: 'contentTypeId', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a content type" />
                </SelectTrigger>
                <SelectContent>
                  {mockContentTypes.map((ct) => (
                    <SelectItem key={ct.id} value={ct.id.toString()}>{ct.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">{editingId ? 'Update' : 'Create'} Post</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Content Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.slug}</TableCell>
                  <TableCell>{mockContentTypes.find(ct => ct.id === post.contentTypeId)?.name}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit('posts', post.id)} className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('posts', post.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}