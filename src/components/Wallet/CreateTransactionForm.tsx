"use client"

import { useState } from "react"
import { TransactionApi } from "@/src/APIs/transactionApi"
import { Button } from "@/src/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { toast } from "@/src/components/ui/use-toast"
import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams"
import { TransactionType } from "@/src/enums/transactionType"
import { IUser } from "@/src/interfaces/userInterface"
import { TransactionFormSchema } from "@/src/utils/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useClickAway } from "@uidotdev/usehooks"
import { useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa6"
import { LuCopyPlus } from "react-icons/lu"
import * as z from "zod"

type CreateTransactionFormProps = {
  type?: TransactionType
  user: IUser
  setUser: (user: IUser) => void
}

export const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({ type, user, setUser }) => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)

  const ref = useClickAway<HTMLFormElement>(() => {
    setIsFormDisplayed(false)
  })

  const urlParam = type === TransactionType.INCOMES ? DynamicUrlParams.INCOMES : DynamicUrlParams.EXPENSES

  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      label: "",
      amount: 0,
    },
  })

  const onSubmit = (data: z.infer<typeof TransactionFormSchema>) => {
    TransactionApi.post(data, urlParam).then((res) => {
      if (res.status === 200) {
        setUser({ ...user, [urlParam]: [...user[urlParam], res.data] })

        toast({
          title: "Transaction ajoutée",
          description: `La transaction "${data.label}" a bien été ajoutée.`,
          duration: 3000,
        })

        setIsFormDisplayed(false)
        form.reset()
      }
    })
  }

  if (!isFormDisplayed) {
    return (
      <div className="mt-auto text-center">
        <Button variant="ghost" onClick={() => setIsFormDisplayed(true)}>
          <LuCopyPlus className="w-8" />
        </Button>
      </div>
    )
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
              <FormDescription className="px-2 text-xs italic">Label de la transaction.</FormDescription>
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
                <Input type="text" placeholder="Montant" {...field} />
              </FormControl>
              <FormDescription className="px-2 text-xs italic">Montant de la transaction.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" type="submit">
          <FaCheck className="w-4" />
        </Button>
      </form>
    </Form>
  )
}
