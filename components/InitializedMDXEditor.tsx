'use client'

import { ForwardedRef, useMemo } from 'react'
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
  KitchenSinkToolbar,
  InsertCodeBlock
} from '@mdxeditor/editor'

interface InitializedMDXEditorProps extends MDXEditorProps {
  editorRef: ForwardedRef<MDXEditorMethods> | null
}

const accordionTemplate = `
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Accordion Title</AccordionTrigger>
    <AccordionContent>
      Accordion Content
    </AccordionContent>
  </AccordionItem>
</Accordion>
`

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: InitializedMDXEditorProps) {
  const plugins = useMemo(() => [
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
          <InsertCodeBlock />
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
    diffSourcePlugin(),
  ], [])

  return (
    <div>
      <MDXEditor
        plugins={plugins}
        {...props}
        ref={editorRef}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          const editor = (editorRef as any)?.current
          if (editor) {
            editor.insertMarkdown(accordionTemplate)
          }
        }}
      >
        Insert Accordion
      </button>
    </div>
  )
}
