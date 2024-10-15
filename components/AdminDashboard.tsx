'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentTypeForm } from '@/components/ContentTypeForm'
import { PageForm } from '@/components/PageForm'
import { PostForm } from '@/components/PostForm'
import { ContentList } from '@/components/ContentList'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('content-types')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="content-types">Content Types</TabsTrigger>
        <TabsTrigger value="pages">Pages</TabsTrigger>
        <TabsTrigger value="posts">Posts</TabsTrigger>
      </TabsList>
      <TabsContent value="content-types">
        <ContentTypeForm />
        <ContentList type="content-types" />
      </TabsContent>
      <TabsContent value="pages">
        <PageForm />
        <ContentList type="pages" />
      </TabsContent>
      <TabsContent value="posts">
        <PostForm />
        <ContentList type="posts" />
      </TabsContent>
    </Tabs>
  )
}

