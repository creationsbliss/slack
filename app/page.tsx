"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div className="font-semibold text-2xl">
      <p>Home page</p>
      <Button onClick={() => signOut()}> Sign out </Button>
    </div>
  );
}
