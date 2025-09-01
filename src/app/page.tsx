import Link from 'next/link';

const pages = ['server-about', 'client-about'];

export default function Home() {
  return (
    <div className='w-full h-full overflow-hidden'>
      <h1>Hello World</h1>
      <ol>
        {pages.map((page) => (
          <li key={page}>
            <Link href={`/${page}`}>{page}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
