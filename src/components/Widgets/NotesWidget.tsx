import { useEffect, useState } from "react";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Card } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { toast } from "@/src/components/ui/use-toast";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { marked } from "marked";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";

// const sampleText =
//   '# Titre\n## Sous-Titre \n### Titre plus profond\n \nLes paragraphes sont séparés\npar une ligne vide.\n\nLaissé deux espaces à la fin d\'une ligne pour  \naller à la ligne.\n\nAttributs *italique*, **gras**, \n`monospace`, ~~rayé~~.\n\nListe:\n\n  * pommes\n  * oranges\n  * poires\n\nListe numérotée:\n\n  1. jambon\n  2. cornichon\n  3. pain \n\n Lien automatique : https://brazillierjohan.fr \n\n```\n console.log("hello"); \n``` ';

export const NotesWidget: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);
  if (!user) return null;

  const [notes, setNotes] = useState<string>(user.notes);
  const [editNotes, setEditNotes] = useState<boolean>(false);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      handleFormatChange();
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [notes]);

  const handleFormatChange = () => {
    if (user && notes !== user.notes) {
      UserApi.patch({ notes: notes }).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };
          newUser.notes = notes;

          setUser(newUser);
          toast({
            title: "Format des opérations",
            description: "Le format des opérations a bien été mis à jour.",
          });
        }
      });
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={makeCardOpacity()}>
      <Card className="w-fit min-w-[400px] overflow-auto rounded-md p-4 ring">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold uppercase">Mes notes</h4>

          <div className="flex items-center gap-2">
            <MdEdit />
            <div className="switch " data-ison={editNotes} onClick={() => setEditNotes(!editNotes)}>
              <motion.div className="handle" layout />
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {!editNotes && <MarkdownDiv className="min-h-[215px]" dangerouslySetInnerHTML={{ __html: marked(notes) }} />}

        {editNotes && (
          <textarea
            className="h-full w-full focus:outline-none"
            value={notes}
            rows={9}
            onChange={(e) => setNotes(e.target.value)}
          />
        )}
      </Card>
    </motion.div>
  );
};

export const MarkdownDiv = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }

  h1 {
    font-size: 1.875rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.125rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 0.875rem;
  }

  p {
    margin: 1rem 0;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 0.25rem 0;
  }

  blockquote {
    margin: 1rem 0;
    padding-left: 1rem;
    border-left: 0.25rem solid #e2e8f0;
  }

  a {
    color: #3182ce;
  }

  a:hover {
    color: #2c5282;
  }

  img {
    max-width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,
  td {
    padding: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  pre {
    margin: 1rem 0;
    padding: 1rem;
    background-color: #edf2f7;
    border-radius: 0.375rem;
    overflow: auto;
  }

  code {
    font-family: monospace;
    font-size: 0.875rem;
    color: #2d3748;
  }

  code::before,
  code::after {
    content: "\`";
  }

  hr {
    margin: 2rem 0;
    border-top: 1px solid #e2e8f0;
  }
`;
