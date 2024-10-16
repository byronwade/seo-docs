'use client'

import { useState, useEffect, useRef } from 'react'
import { MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { createContentType, updateContentType, deleteContentType, createPage, updatePage, deletePage, createPost, updatePost, deletePost } from '../actions'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { serialize } from 'next-mdx-remote/serialize'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Dynamically import the InitializedMDXEditor component
const InitializedMDXEditor = dynamic(
  () => import('@/components/InitializedMDXEditor'),
  { ssr: false }
)

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('content-types')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})
  const [contentTypes, setContentTypes] = useState([])
  const [pages, setPages] = useState([])
  const [posts, setPosts] = useState([])
  const { toast } = useToast()
  const editorRef = useRef<MDXEditorMethods>(null)
  const [editingType, setEditingType] = useState<'pages' | 'posts' | null>(null)

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
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEditorChange = (content: string) => {
    setFormData(prevData => ({
      ...prevData,
      content: content
    }));
  };

  const handleSubmit = async (type: 'pages' | 'posts') => {
    try {
      const serializedContent = await serialize(formData.content || '', {
        mdxOptions: {
          jsx: true,
          remarkPlugins: [],
          rehypePlugins: [],
        },
        scope: {
          Accordion,
          AccordionContent,
          AccordionItem,
          AccordionTrigger,
        },
      });

      const data = {
        ...formData,
        content: JSON.stringify(serializedContent)
      };

      let result;
      if (type === 'pages') {
        result = editingId
          ? await updatePage({ ...data, id: editingId })
          : await createPage(data);
      } else if (type === 'posts') {
        result = editingId
          ? await updatePost({ ...data, id: editingId })
          : await createPost(data);
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `${type} ${editingId ? 'updated' : 'created'} successfully`,
        });
        setFormData({});
        setEditingId(null);
        if (type === 'pages') fetchPages();
        else if (type === 'posts') fetchPosts();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (type: 'pages' | 'posts', id: number) => {
    const item = type === 'pages' ? pages.find(p => p.id === id) : posts.find(p => p.id === id);
    if (item) {
      setFormData({
        ...item,
        contentTypeId: item.contentTypeId?.toString()
      });
      setEditingId(id);
      setEditingType(type);
      
      if (editorRef.current) {
        editorRef.current.setMarkdown(item.content || '');
      }
    }
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === 'content-types') {
        await deleteContentType(BigInt(id))
      } else if (type === 'pages') {
        await deletePage(BigInt(id))
      } else if (type === 'posts') {
        await deletePost(BigInt(id))
      }
      
      toast({ title: 'Deleted successfully' })
      
      if (type === 'content-types') fetchContentTypes()
      else if (type === 'pages') fetchPages()
      else if (type === 'posts') fetchPosts()
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    }
  }

  const getItemLink = (item, type) => {
    const contentType = contentTypes.find(ct => ct.id === item.contentTypeId)
    return `${process.env.NEXT_PUBLIC_DOMAIN}/${contentType?.slug}/${item.slug}`
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
              <InitializedMDXEditor
                key={formData.content}
                editorRef={editorRef}
                markdown={formData.content || ''}
                onChange={handleEditorChange}
                contentEditableClassName="prose max-w-full"
              />
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
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('pages', page.id)} className="mr-2">Delete</Button>
                    <Link href={getItemLink(page, 'pages')} target="_blank" passHref>
                      <Button variant="link" size="sm">Open</Button>
                    </Link>
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
              <InitializedMDXEditor
                key={formData.content}
                editorRef={editorRef}
                markdown={formData.content || ''}
                onChange={handleEditorChange}
                contentEditableClassName="prose max-w-full"
              />
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
                    <Button variant="destructive" size="sm" onClick={() => handleDelete('posts', post.id)} className="mr-2">Delete</Button>
                    <Link href={getItemLink(post, 'posts')} target="_blank" passHref>
                      <Button variant="link" size="sm">Open</Button>
                    </Link>
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
