"use client ";

import { useEffect, useState } from "react";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import { toast } from "@/src/components/ui/use-toast";
import { ForwardRefEditor } from "@/src/components/Widgets/MarkDownEditor/ForwardRefEditor";
import { useAtom } from "jotai";

export const MarkDownEditor: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user && currentNote !== user.notes) {
        UserApi.patch({ notes: currentNote }).then((res) => {
          if (res.status === 200) {
            const newUser = { ...user };
            newUser.notes = currentNote;

            setUser(newUser);
            toast({
              title: "Enregistrement des nouvelles notes",
              description: "Les nouvelles notes ont bien été enregistrées.",
            });
          }
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentNote, user, setUser]);

  const formatMarkdown = (markdownText: string) => {
    return markdownText.replace(/\n/g, "<br />");
  };

  if (!user) return null;

  return (
    <ForwardRefEditor
      markdown={formatMarkdown(user?.notes)}
      placeholder="Prenez vos notes ici... !"
      onChange={(newNote) => setCurrentNote(newNote)}
    />
  );
};
