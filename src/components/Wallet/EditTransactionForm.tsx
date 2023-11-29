"use client";

import { TransactionApi } from "@/src/APIs/transactionApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { TransactionType } from "@/src/enums/transactionType";
import { ITransaction } from "@/src/interfaces/transactionInterface";
import { TransactionFormSchema } from "@/src/utils/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as z from "zod";

type EditTransactionFormProps = {
  type: string;
  transaction: ITransaction;
};

export const EditTransactionForm: React.FC<EditTransactionFormProps> = ({ transaction, type }) => {
  const [user, setUser] = useAtom(userAtom);

  const urlParam = type === TransactionType.INCOMES ? TransactionType.INCOMES : TransactionType.EXPENSES;

  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      label: transaction.label,
      amount: transaction.amount,
    },
  });

  const onSubmit = (data: z.infer<typeof TransactionFormSchema>) => {
    console.log(data);
  };

  const onDelete = () => {
    if (user && transaction._id) {
      TransactionApi.delete(transaction._id, urlParam).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };

          if (urlParam === TransactionType.INCOMES) {
            newUser.incomes = newUser.incomes.filter((t) => t._id !== transaction._id);
          }

          if (urlParam === TransactionType.EXPENSES) {
            newUser.expenses = newUser.expenses.filter((t) => t._id !== transaction._id);
          }

          setUser(newUser);
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form className="flex w-full justify-between" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="w-fit">
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
            <FormItem className="w-fit">
              <FormControl>
                <Input type="number" placeholder="Montant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="ghost" type="submit">
          Update
        </Button>

        <Button role="button" variant="ghost" onClick={onDelete}>
          Delete
        </Button>
      </form>
    </Form>
  );
};
