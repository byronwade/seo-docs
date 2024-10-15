'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('content-types')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})
  const [contentTypes, setContentTypes] = useState([])
  const [pages, setPages] = useState([])
  const [posts, setPosts] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchContentTypes()
    fetchPages()
    fetchPosts()
  }, [])

  const fetchContentTypes = async () => {
    const response = await fetch('/api/content-types')
    const data = await response.json()
    setContentTypes(data)
  }

  const fetchPages = async () => {
    const response = await fetch('/api/pages')
    const data = await response.json()
    setPages(data)
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    setPosts(data)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (type) => {
    const url = `/api/${type}`
    const method = editingId ? 'PUT' : 'POST'
    const body = JSON.stringify(editingId ? { ...formData, id: editingId } : formData)

    try {
      const response = await fetch(url, { method, body, headers: { 'Content-Type': 'application/json' } })
      if (!response.ok) throw new Error('Failed to save')
      
      toast({ title: `${editingId ? 'Updated' : 'Created'} successfully` })
      setFormData({})
      setEditingId(null)
      
      if (type === 'content-types') fetchContentTypes()
      else if (type === 'pages') fetchPages()
      else if (type === 'posts') fetchPosts()
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    }
  }

  const handleEdit = (type, id) => {
    setEditingId(id)
    const item = type === 'content-types' 
      ? contentTypes.find(ct => ct.id === id)
      : type === 'pages'
      ? pages.find(p => p.id === id)
      : posts.find(p => p.id === id)
    setFormData(item)
  }

  const handleDelete = async (type, id) => {
    try {
      const response = await fetch(`/api/${type}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete')
      
      toast({ title: 'Deleted successfully' })
      
      if (type === 'content-types') fetchContentTypes()
      else if (type === 'pages') fetchPages()
      else if (type === 'posts') fetchPosts()
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    }
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
              {contentTypes.map((ct) => (
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
              <Textarea id="content" name="content" value={formData.content || ''} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="contentTypeId">Content Type</Label>
              <Select name="contentTypeId" value={formData.contentTypeId?.toString() || ''} onValueChange={(value) => handleInputChange({ target: { name: 'contentTypeId', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((ct) => (
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
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  <TableCell>{contentTypes.find(ct => ct.id === page.contentTypeId)?.name}</TableCell>
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
              <Textarea id="content" name="content" value={formData.content || ''} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="contentTypeId">Content Type</Label>
              <Select name="contentTypeId" value={formData.contentTypeId?.toString() || ''} onValueChange={(value) => handleInputChange({ target: { name: 'contentTypeId', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((ct) => (
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
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.slug}</TableCell>
                  <TableCell>{contentTypes.find(ct => ct.id === post.contentTypeId)?.name}</TableCell>
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