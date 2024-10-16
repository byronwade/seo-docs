'use client'

import { ForwardedRef } from 'react'
import {
  MDXEditor,
  MDXEditorMethods,
  MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  ListsToggle,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  InsertThematicBreak,
  KitchenSinkToolbar
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
        toolbarPlugin({
          toolbarContents: () => (
            <KitchenSinkToolbar>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CreateLink />
              <InsertImage />
              <ListsToggle />
              <InsertThematicBreak />
            </KitchenSinkToolbar>
          )
        }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin(),
        codeMirrorPlugin(),
        markdownShortcutPlugin(),
        diffSourcePlugin()
      ]}
      {...props}
      ref={editorRef}
    />
  )
}
