'use client';

import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div>
      <div>Error Page: {error?.message}</div>
      <Button onClick={() => reset && reset()}>Try Again</Button>
    </div>
  );
};

