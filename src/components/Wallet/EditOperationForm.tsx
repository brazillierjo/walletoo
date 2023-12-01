"use client";

import { OperationApi } from "@/src/APIs/operationApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";
import { toast } from "@/src/components/ui/use-toast";
import { OperationType, OperationTypeLabel } from "@/src/enums/operationType";
import { IOperation } from "@/src/interfaces/operationInterface";
import { expenseCategories, incomeCategories } from "@/src/utils/categories";
import { OperationFormSchema } from "@/src/utils/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as z from "zod";

type EditOperationFormProps = {
  type: string;
  operation: IOperation;
  closePanel: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditOperationForm: React.FC<EditOperationFormProps> = ({ operation, type, closePanel }) => {
  const [user, setUser] = useAtom(userAtom);

  const urlParam = type === OperationTypeLabel.INCOMES ? OperationType.INCOMES : OperationType.EXPENSES;

  const form = useForm<z.infer<typeof OperationFormSchema>>({
    resolver: zodResolver(OperationFormSchema),
    defaultValues: {
      label: operation.label,
      amount: operation.amount,
      category: operation.category ?? "",
    },
  });

  const onSubmit = (formData: z.infer<typeof OperationFormSchema>) => {
    if (!user || !formData || !operation._id) return;

    const updatedOperation = {
      ...formData,
      _id: operation._id,
    };

    const updatedUser = { ...user };
    const operationKey = urlParam === OperationType.INCOMES ? OperationType.INCOMES : OperationType.EXPENSES;

    OperationApi.put(updatedOperation, urlParam).then((res) => {
      if (res.status !== 200) return;

      updatedUser[operationKey] = user[operationKey].map((t) => {
        if (t._id === updatedOperation._id) return updatedOperation;
        return t;
      });

      setUser(updatedUser);
      closePanel(false);
      toast({
        title: "Mise à jour d'une opération",
        description: `L'opération "${updatedOperation.label}" a bien été mise à jour.`,
        duration: 3000,
      });
    });
  };

  const onDelete = () => {
    if (!user || !operation._id) return;
    const updatedUser = { ...user };
    const operationKey = urlParam === OperationType.INCOMES ? OperationType.INCOMES : OperationType.EXPENSES;

    OperationApi.delete(operation._id, urlParam).then((res) => {
      if (res.status !== 200) return;

      updatedUser[operationKey] = user[operationKey].filter((t) => t._id !== operation._id);

      setUser(updatedUser);
      closePanel(false);
      toast({
        title: "Suppression d'une opération",
        description: `L'opération "${operation.label}" a bien été supprimée.`,
        duration: 3000,
      });
    });
  };

  const renderCategoryOptions = (categories: string[]) => {
    return categories.map((category, index) => (
      <SelectItem key={index} value={category}>
        {category}
      </SelectItem>
    ));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-lg font-bold">Modification de l'opération</h3>

        <p className="mb-4 text-sm text-gray-600">
          Remplissez les champs ci-dessous pour mettre à jour les informations de l'opération.
        </p>

        <Form {...form}>
          <form className="flex w-full flex-col justify-between gap-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input className="capitalize" type="text" placeholder="Label" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="Montant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Catégorie (facultatif)</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {type === OperationTypeLabel.INCOMES && renderCategoryOptions(incomeCategories)}
                          {type === OperationTypeLabel.EXPENSES && renderCategoryOptions(expenseCategories)}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
              <Button variant="default" type="submit">
                Mettre à jour
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-bold">Suppression de l'opération</h3>

        <p className="mb-4 text-sm text-gray-600">
          Cliquez sur 'Supprimer' pour retirer définitivement cette opération de votre historique. Cette action est
          irréversible.
        </p>

        <Button variant="destructive" type="button" onClick={onDelete}>
          Supprimer
        </Button>
      </div>
    </div>
  );
};
