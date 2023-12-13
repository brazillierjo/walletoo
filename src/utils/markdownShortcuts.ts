interface MarkdownShortcut {
  description: string;
  code: string;
}

export const markdownShortcuts: MarkdownShortcut[] = [
  { description: "Texte en gras", code: "**texte**" },
  { description: "Texte en italique", code: "*texte*" },
  { description: "Liste", code: "* ou -" },
  { description: "Block de code", code: "`code sur une ligne`" },
];
