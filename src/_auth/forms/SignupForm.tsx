import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validations";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/ui/shared/Loader";
// import { createUserAccount } from "@/lib/appwrite/api";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";


const SignupForm = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
    const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();

    const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

        // 1. Define your form.
        const form = useForm<z.infer<typeof SignupValidation>>({
            resolver: zodResolver(SignupValidation),
            defaultValues: {
              name: "",
              username: "",
              email: "",
              password: "",
            },
          });
         
          // 2. Define a submit handler.
         async function onSubmit(values: z.infer<typeof SignupValidation>) {
            const newUser = await createUserAccount(values);
            if(!newUser){
                return toast({title: 'Sign up failed, Please try again.'})
            }

            const session = await signInAccount({email: values.email, password:values.password});

            if(!session){
                return toast({title: 'Sign in failed. Please try again'})
            }

            const isLoggedIn = await checkAuthUser();
            if(isLoggedIn){
                form.reset();
                navigate("/");
            } else return toast({title: "Sign up failed. Please try again"})

            console.log(newUser)
          }
  return (
    <Form {...form}>
        <div className="sm:w-420 flex flex-col">
            <img src="/assets/images/logo.svg" alt="Logo" />

            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create an account</h2>
            <p className="text-light-3 small-medium md:base-regular pt-2">To use Snapgram enter your details</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  
              <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />    
              <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />    
              <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />         
        <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
                <div className="flex-center gap-2">
                    <Loader />Loading....
                </div>
            ): "Sign up"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">Already have an account? 
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
      </form>
          </div>
    </Form>
  );
}

export default SignupForm