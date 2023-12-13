"use client";

import "@mdxeditor/editor/style.css";

import type { ForwardedRef } from "react";
import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  headingsPlugin,
  imagePlugin,
  InsertTable,
  InsertThematicBreak,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      {...props}
      ref={editorRef}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <ListsToggle />
              <InsertTable />
              <InsertThematicBreak />
            </>
          ),
        }),
      ]}
    />
  );
}
