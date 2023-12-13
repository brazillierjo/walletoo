"use client";

import { forwardRef } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/src/components/ui/card";
import { makeCardOpacity } from "@/src/utils/animations";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import { motion } from "framer-motion";

const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  ssr: false,
});

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <motion.div initial="hidden" animate="visible" variants={makeCardOpacity()}>
    <Card className="h-full w-full ring lg:w-fit lg:min-w-[400px]">
      <Editor {...props} editorRef={ref} />
    </Card>
  </motion.div>
));

ForwardRefEditor.displayName = "ForwardRefEditor";
