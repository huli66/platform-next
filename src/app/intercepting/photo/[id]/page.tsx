export default async function PhotoPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <div>PhotoPage: {id}</div>;
}