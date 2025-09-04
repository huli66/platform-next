'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Photo3Page() {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <div>
      <div onClick={onClose}>Intercepting Photo3Page</div>
      <Link href={`/intercepting`}>Home</Link>
    </div>
  );
}