"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 chars"),
  email: z.email("Invalid email").min(1, "Email required"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.replace("/home");
          setIsLoading(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <Card className="rounded-lg border-[#eceae4] bg-[#fcfbf8]/90 text-[#1c1c1c] shadow-none backdrop-blur-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold text-[#1c1c1c]">
          Create an account
        </CardTitle>
        <CardDescription className="text-[#5f5f5d]">
          Start building your Aivonix workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="border-[#eceae4] bg-[#f7f4ed] text-[#1c1c1c] placeholder:text-[#5f5f5d] dark:bg-[#f7f4ed] dark:text-[#1c1c1c]"
                      {...field}
                    />
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
                    <Input
                      placeholder="johndoe@example.com"
                      type="email"
                      className="border-[#eceae4] bg-[#f7f4ed] text-[#1c1c1c] placeholder:text-[#5f5f5d] dark:bg-[#f7f4ed] dark:text-[#1c1c1c]"
                      {...field}
                    />
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
                    <Input
                      placeholder="*****"
                      type="password"
                      className="border-[#eceae4] bg-[#f7f4ed] text-[#1c1c1c] placeholder:text-[#5f5f5d] dark:bg-[#f7f4ed] dark:text-[#1c1c1c]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#1c1c1c] text-[#fcfbf8] hover:bg-[#2a2a2a]"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              Sign Up
            </Button>
            <div className="text-center text-sm text-[#5f5f5d]">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="font-medium text-[#1c1c1c] underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
