import { useEffect, useState } from "react";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { toast } from "@/src/components/ui/use-toast";
import { makeCardOpacity } from "@/src/utils/animations";
import { MarkdownDiv, sampleMarkdown } from "@/src/utils/markdown";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { marked } from "marked";
import { MdEdit } from "react-icons/md";

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
      <Sheet>
        <Card className="w-full overflow-auto p-4 lg:w-fit lg:min-w-[700px]">
          <div className="flex items-center justify-between">
            <SheetTrigger>
              <Button variant="outline">Exemple</Button>
            </SheetTrigger>

            <h4 className="text-sm font-semibold uppercase">Mes notes</h4>

            <div className="flex items-center gap-2">
              <MdEdit />
              <div className="switch" data-ison={editNotes} onClick={() => setEditNotes(!editNotes)}>
                <motion.div className="handle" layout />
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          {!editNotes && (
            <MarkdownDiv
              className="min-h-[203px]"
              dangerouslySetInnerHTML={{
                __html: marked(notes !== "" ? notes : "*Écrivez vos notes ici en activant l'édition...*"),
              }}
            />
          )}

          {editNotes && (
            <textarea
              className="h-full w-full focus:outline-none"
              placeholder="Écrivez vos notes ici..."
              value={notes}
              rows={20}
              onChange={(e) => setNotes(e.target.value)}
            />
          )}
        </Card>

        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Exemple de markdown</SheetTitle>
            <SheetDescription>
              <div className="flex justify-evenly gap-4">
                <div className="h-full w-full px-2">
                  <h4 className="mb-2 font-semibold">Syntaxe d'écriture :</h4>

                  <pre className="rounded-md border-2 p-2">
                    <code>{sampleMarkdown}</code>
                  </pre>
                </div>

                <div className="h-full w-full px-2">
                  <h4 className="mb-2 font-semibold">Rendu :</h4>

                  <MarkdownDiv
                    className="rounded-md border-2 p-2"
                    dangerouslySetInnerHTML={{ __html: marked(sampleMarkdown) }}
                  />
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};
