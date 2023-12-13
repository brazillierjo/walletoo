"use client";

import "@mdxeditor/editor/style.css";

import type { ForwardedRef } from "react";
import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
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
        quotePlugin(),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        imagePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
            </>
          ),
        }),
      ]}
    />
  );
}
