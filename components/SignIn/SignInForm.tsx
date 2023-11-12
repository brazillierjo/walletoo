import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignInInputs, signInSchema } from "@/lib/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
    email: string;
    password: string;
};

export default function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInInputs>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
                <Input type='email' placeholder='Email' {...register("email")} />
                {errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span>}

                <Input type='password' placeholder='Mot de passe' {...register("password")} />
                {errors.password && <span className='text-xs text-red-500'>{errors.password.message}</span>}
            </div>

            <Button type='submit'>Se connecter</Button>
        </form>
    );
}
