export default async function BlogPage({ params }: { params: { blog: string } }) {
  const {blog} = await params;
  return <div>BlogPage: {blog}</div>;
}