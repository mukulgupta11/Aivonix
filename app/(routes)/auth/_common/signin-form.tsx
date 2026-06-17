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
import { useAuthToken } from "@/hooks/use-auth-token";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.email("Invalid email").min(1, "Email required"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const { setBearerToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          const token = ctx.response.headers.get("set-auth-token");
          if (token) {
            setBearerToken(token);
          }
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
          Welcome back
        </CardTitle>
        <CardDescription className="text-[#5f5f5d]">
          Sign in to your Aivonix workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              className="w-full rounded-md bg-[#0f8f8d] text-[#fcfbf8] hover:bg-[#0b7472]"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              Sign In
            </Button>
            <div className="text-center text-sm text-[#5f5f5d]">
              Don't have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="font-medium text-[#1c1c1c] underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
