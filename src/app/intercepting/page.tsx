import Link from "next/link";

export default function InterceptingPage() {
  return (
    <div>
      <h1>InterceptingPage</h1>
      {[1, 2, 3].map((item) => (
        <Link href={`/intercepting/photo/${item}`} key={item}>Photo {item}</Link>
      ))}
    </div>
  );
}