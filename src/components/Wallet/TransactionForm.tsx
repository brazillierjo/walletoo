"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "@/src/components/ui/use-toast";
import { FaSquarePlus } from "react-icons/fa6";
import { TransactionFormSchema } from "@/src/utils/formSchemas";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/src/components/ui/form";

export function TransactionForm() {
    const form = useForm<z.infer<typeof TransactionFormSchema>>({
        resolver: zodResolver(TransactionFormSchema),
        defaultValues: {
            label: undefined,
            amount: undefined,
        },
    });

    const onSubmit = (data: z.infer<typeof TransactionFormSchema>) => {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex justify-between gap-5'>
                <FormField
                    control={form.control}
                    name='label'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                <Input
                                    className='capitalize'
                                    type='text'
                                    placeholder='Label'
                                    {...field}
                                />
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

                <Button variant='ghost' type='submit'>
                    <FaSquarePlus className='h-6 w-6 fill-green-600' />
                </Button>
            </form>
        </Form>
    );
}
