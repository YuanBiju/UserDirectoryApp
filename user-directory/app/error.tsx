"use client"

import { Button } from "@/components/ui/button";

export default function Error({ error }: { error: Error }) {

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h2 className="mb-2 text-xl font-bold">Something went wrong</h2>
      <p className="mb-4 text-sm text-muted-foreground">Error message: {error.message}</p>
      <div className="flex gap-2">
        <Button onClick={() => window.location.reload()}>
        Try again
      </Button>
      </div>
    </div>
  );
}