"use client";

import { forwardRef } from "react";
import dynamic from "next/dynamic";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { Card } from "@/src/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { makeCardOpacity } from "@/src/utils/animations";
import { markdownShortcuts } from "@/src/utils/markdownShortcuts";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import { motion } from "framer-motion";

const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  ssr: false,
});

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <motion.div initial="hidden" animate="visible" variants={makeCardOpacity()}>
    <Card className="flex h-full w-full flex-col ring lg:w-fit lg:min-w-[400px]">
      <Editor {...props} editorRef={ref} />

      <Accordion className="mt-auto h-fit border-t px-4" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="opacity-80">
            <TableCaption className="mt-0">Guide des raccourcis</TableCaption>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {markdownShortcuts.map((shortcut, index) => (
                  <TableRow key={index}>
                    <TableCell>{shortcut.description}</TableCell>
                    <TableCell className="text-right font-semibold text-pink-700">
                      <code>{shortcut.code}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  </motion.div>
));

ForwardRefEditor.displayName = "ForwardRefEditor";
