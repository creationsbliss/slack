"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { tr } from "zod/v4/locales";

const formSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(8),
});

const SignInPage = () => {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  async function handleOAuthSignIn(provider: "github" | "google") {
    setSubmitting(true);
    await signIn(provider);
  }

  return (
    <div className="max-w-[500] mx-auto h-screen flex flex-col justify-center px-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Sign in to Slack</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
          <div className="flex gap-x-2 border-b pt-4 pb-8">
            <Button
              variant="outline"
              className="w-1/2"
              disabled={submitting}
              onClick={() => handleOAuthSignIn("github")}
            >
              <FaGithub />
              {submitting ? "Signing in..." : "GitHub"}
            </Button>
            <Button
              variant="outline"
              className="w-1/2"
              disabled={submitting}
              onClick={() => handleOAuthSignIn("google")}
            >
              <FcGoogle />
              {submitting ? "Signing in..." : "Google"}
            </Button>
          </div>
        </CardHeader>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                          disabled={submitting}
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
                          placeholder="Enter your password"
                          {...field}
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            Don&apos;t have an account?
            <Link href="/sign-up" className="text-sky-500 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
