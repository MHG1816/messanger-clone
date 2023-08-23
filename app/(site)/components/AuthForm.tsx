"use client";

import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle} from "react-icons/bs" ;
import { signIn } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";





type Variant = "LOGIN" | "REGISTER";


const Auth = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);
  7;

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      axios.post('/api/register', data)
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false))
    }

    if (variant === "LOGIN") {
      signIn('credentials', {
        ...data,
        redirect: false
      }).then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }

        if(!callback?.error && callback?.ok){
          toast.success('Success')
        }
      })
      .finally(() => setLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);

    // Next Auth Social Sign In
  };
  return (
    <div
      className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
    >
      <div
        className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10
                "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {
          variant === 'REGISTER' && (
            <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading}/>
          )
          }
          <Input label="Email" register={register} id="email" errors={errors} disabled={isLoading}/>
          <Input label="Password" register={register} type="password" errors={errors} id="password" disabled={isLoading}/>
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
                {variant === "LOGIN" ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="mt-6 flex gap-2">
                <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")}/>
                <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")}/>
            </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
                {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
            </div>
            <div onClick={toggleVariant} className="font-semibold underline cursor-pointer hover:text-gray-600">
                {variant === "LOGIN" ? 'Create an account' : "Login"}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
