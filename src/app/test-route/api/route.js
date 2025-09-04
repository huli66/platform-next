import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await iterator.next();
      await sleep(1000);
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    }
  })
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

const encoder = new TextEncoder();

async function* generateText() {
  yield encoder.encode('Hello, world!111');
  await sleep(1000);
  yield encoder.encode('Hello, world!');
  await sleep(1000);
  yield encoder.encode('Hello, world!222');
  await sleep(1000);
}

export async function GET(request) {
  const iterator = generateText();
  const stream = iteratorToStream(iterator);
  return new Response(stream);
}

export async function POST(request) {
  const { message } = await request.json();
  console.log('message', message);
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
  const data = await res.json();
  return NextResponse.json({ data });
}
