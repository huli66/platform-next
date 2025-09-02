import Link from "next/link";

export default async function PhotoPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>
      <div>Intercepting PhotoPage Photo {id}!</div>
      <Link href={`/intercepting`}>Close</Link>
    </div>
  );
}