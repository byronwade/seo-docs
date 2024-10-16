'use client'

import { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  MDXEditorProps
} from '@mdxeditor/editor'

interface InitializedMDXEditorProps extends MDXEditorProps {
  editorRef: ForwardedRef<MDXEditorMethods> | null
}

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: InitializedMDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin()
      ]}
      {...props}
      ref={editorRef}
      onError={(error) => {
        console.error('MDXEditor error:', error);
        // You can add additional error handling here, such as displaying a toast notification
      }}
    />
  )
}
