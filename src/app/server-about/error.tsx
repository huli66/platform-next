'use client';

import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div>
      <div>Server About Error</div>
      <Button onClick={() => window.location.reload()}>Reset</Button>
    </div>
  );
}