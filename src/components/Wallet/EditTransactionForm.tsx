"use client";

import { TransactionApi } from "@/src/APIs/transactionApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { toast } from "@/src/components/ui/use-toast";
import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams";
import { TransactionType } from "@/src/enums/transactionType";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import { expenseCategories, incomeCategories } from "@/src/utils/categories";
import { TransactionFormSchema } from "@/src/utils/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as z from "zod";

type EditTransactionFormProps = {
  type: string;
  transaction: ITransaction;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditTransactionForm: React.FC<EditTransactionFormProps> = ({ transaction, type, closeModal }) => {
  const [user, setUser] = useAtom(userAtom);

  const urlParam = type === TransactionType.INCOMES ? DynamicUrlParams.INCOMES : DynamicUrlParams.EXPENSES;

  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      label: transaction.label,
      amount: transaction.amount,
      category: transaction.category ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof TransactionFormSchema>) => {
    console.log(data);
  };

  const onDelete = () => {
    if (!user || !transaction._id) return;
    const updatedUser = { ...user };
    const transactionKey = urlParam === DynamicUrlParams.INCOMES ? DynamicUrlParams.INCOMES : DynamicUrlParams.EXPENSES;

    TransactionApi.delete(transaction._id, urlParam).then((res) => {
      if (res.status !== 200) return;

      updatedUser[transactionKey] = user[transactionKey].filter((t) => t._id !== transaction._id);

      setUser(updatedUser);
      closeModal(false);
      toast({
        title: "Transaction supprimée",
        description: `La transaction "${transaction.label}" a bien été supprimée.`,
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
                  <Input type="text" placeholder="Montant" {...field} />
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
                      {type === TransactionType.INCOMES && renderCategoryOptions(incomeCategories)}
                      {type === TransactionType.EXPENSES && renderCategoryOptions(expenseCategories)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
          <Button variant="destructive" type="button" onClick={onDelete}>
            Supprimer
          </Button>

          <Button variant="default" type="submit">
            Mettre à jour
          </Button>
        </div>
      </form>
    </Form>
  );
};
