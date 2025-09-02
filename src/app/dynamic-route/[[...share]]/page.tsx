export default async function SharePage({ params }: { params: { share: string[] } }) {
  const {share} = await params;
  return <div>SharePage: {JSON.stringify(share)}</div>;
}