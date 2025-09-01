'use client';

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div>
      <div>Server About Not Found</div>
      <Button onClick={() => window.location.reload()}>Reset</Button>
    </div>
  );
}