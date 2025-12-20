"use client";

import { useAuthActions } from "@convex-dev/auth/react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(8),
});

const SignInPage = () => {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);
      await signIn("password", { ...values, flow: "signIn" });
    } catch {
      toast.error("An error occurred during sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Google or GitHub sign in
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
                          type="email"
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
                          type="password"
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
                {submitting ? "Signing in..." : "Sign In"}
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
