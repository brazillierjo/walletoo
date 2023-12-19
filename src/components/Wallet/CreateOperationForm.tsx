"use client";

import { useState } from "react";
import { OperationApi } from "@/src/APIs/operationApi";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { toast } from "@/src/components/ui/use-toast";
import { OperationType, OperationTypeLabel } from "@/src/enums/operationType";
import { IUser } from "@/src/interfaces/userInterface";
import { OperationFormSchema } from "@/src/utils/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClickAway } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { LuCopyPlus } from "react-icons/lu";
import * as z from "zod";

type CreateOperationFormProps = {
  type: OperationTypeLabel;
  user: IUser;
  setUser: (user: IUser) => void;
};

export const CreateOperationForm: React.FC<CreateOperationFormProps> = ({ type, user, setUser }) => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  const ref = useClickAway<HTMLFormElement>(() => {
    setIsFormDisplayed(false);
  });

  const urlParam = type === OperationTypeLabel.INCOMES ? OperationType.INCOMES : OperationType.EXPENSES;

  const form = useForm<z.infer<typeof OperationFormSchema>>({
    resolver: zodResolver(OperationFormSchema),
    defaultValues: {
      label: "",
      amount: 0,
      category: "",
    },
  });

  const onSubmit = (data: z.infer<typeof OperationFormSchema>) => {
    OperationApi.post(data, urlParam).then((res) => {
      if (res.status === 200) {
        setUser({ ...user, [urlParam]: [...user[urlParam], res.data] });

        toast({
          title: "Ajout d'une opération",
          description: `L'opération "${data.label}" a bien été ajoutée.`,
          duration: 3000,
        });

        setIsFormDisplayed(false);
        form.reset();
      }
    });
  };

  if (!isFormDisplayed) {
    return (
      <div className="mt-auto text-center">
        <Button variant="ghost" onClick={() => setIsFormDisplayed(true)}>
          <LuCopyPlus className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between gap-5">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input type="text" placeholder="Label" {...field} />
              </FormControl>
              <FormDescription className="px-2 text-xs italic">Label de l'opération.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input type="number" step="0.01" placeholder="Montant" {...field} />
              </FormControl>
              <FormDescription className="px-2 text-xs italic">Montant de l'opération.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit">
          <FaCheck className="h-3 w-3" />
        </Button>
      </form>
    </Form>
  );
};
