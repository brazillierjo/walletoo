"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "@/src/components/ui/use-toast";
import { IoMdAddCircle } from "react-icons/io";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/src/components/ui/form";

const TransactionFormSchema = z.object({
    label: z.string().min(2).max(50),
    amount: z.number().positive().min(1),
});

export function TransactionForm() {
    const form = useForm<z.infer<typeof TransactionFormSchema>>({
        resolver: zodResolver(TransactionFormSchema),
        defaultValues: {
            label: "",
            amount: 0,
        },
    });

    function onSubmit(data: z.infer<typeof TransactionFormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex justify-between'>
                <FormField
                    control={form.control}
                    name='label'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='text' placeholder='Label' {...field} />
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
                        <FormItem>
                            <FormControl>
                                <Input type='number' placeholder='Amount' {...field} />
                            </FormControl>
                            <FormDescription>Montant de la transaction.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>
                    <IoMdAddCircle />
                </Button>
            </form>
        </Form>
    );
}
