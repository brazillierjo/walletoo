"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { FaCheck } from "react-icons/fa6";
import { TransactionFormSchema } from "@/src/utils/formSchemas";
import { IncomesApi } from "@/src/APIs/incomesApi";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { TransactionType } from "@/src/enums/transactionType";
import { IUser } from "@/src/interfaces/userInterface";

type TransactionFormProps = {
    type: TransactionType;
    user: IUser;
    setUser: any;
};

export const TransactionForm: React.FC<TransactionFormProps> = ({ type, user: user, setUser: setUser }) => {
    const form = useForm<z.infer<typeof TransactionFormSchema>>({
        resolver: zodResolver(TransactionFormSchema),
        defaultValues: {
            label: "",
            amount: 0,
        },
    });

    const onSubmit = (data: z.infer<typeof TransactionFormSchema>) => {
        IncomesApi.post(data).then((res) => {
            if (res.ok && res.data) {
                setUser({ ...user, incomes: [...user.incomes, res.data] });
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex justify-between gap-5'>
                <FormField
                    control={form.control}
                    name='label'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input className='capitalize' type='text' placeholder='Label' {...field} />
                            </FormControl>
                            <FormDescription>Label de la transaction.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='amount'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input type='number' placeholder='Montant' {...field} />
                            </FormControl>
                            <FormDescription>Montant de la transaction.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button variant='default' type='submit'>
                    <FaCheck className='w-4' />
                </Button>
            </form>
        </Form>
    );
};
