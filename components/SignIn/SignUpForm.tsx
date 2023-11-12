import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignUpInputs, signUpSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
    email: string;
    password: string;
    passwordConfirmation: string;
};

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputs>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
                <Input type='email' placeholder='Email' {...register("email")} />
                {errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span>}

                <Input type='password' placeholder='Mot de passe' {...register("password")} />
                {errors.password && <span className='text-xs text-red-500'>{errors.password.message}</span>}

                <Input type='password' placeholder='Confirmer le mot de passe' {...register("passwordConfirmation")} />
                {errors.passwordConfirmation && (
                    <span className='text-xs text-red-500'>{errors.passwordConfirmation.message}</span>
                )}
            </div>

            <Button type='submit'>S&apos;inscrire</Button>
        </form>
    );
}
