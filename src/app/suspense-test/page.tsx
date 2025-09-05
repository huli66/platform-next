import { Suspense } from "react";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function PostFeed() {
  await sleep(2000);
  return <div>Post Feed</div>;
}

async function Weather() {
  await sleep(8000);
  return <div>Weather Weather</div>;
}

async function User() {
  await sleep(5000);
  return <div title='hhh' className="cursor-pointer transition-all duration-300 text-red-500 text-center w-[100px] border border-amber-300 hover:text-blue-500 hover:w-[400px]">User User</div>;
}

export default function SuspenseTest() {
  return (
    <section style={{padding: '20px'}}>
      <input />
      <Suspense fallback={<div>Post Loading...</div>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<div>Weather Loading...</div>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<div>User Loading...</div>}>
        <User />
      </Suspense>
    </section>
  );
}