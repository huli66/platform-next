import { use } from 'react';
import { notFound } from 'next/navigation';
import { env } from 'process';

const messages = ['hello', 'error', 'not-found'];

async function getAbout() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  const idx = Math.floor(Math.random() * messages.length);
  console.log('idx', idx);
  return {
    message: messages[idx]
  }
}

export default function ServerAbout() {
  const {message} = use(getAbout());
  if (message === 'error') {
    if (env.NODE_ENV === 'development') {
      console.log('env', env.NODE_ENV);
      throw new Error('Error');
    }
  }
  if (message === 'not-found') {
    notFound();
  }
  return <div>Server About: {message}</div>;
}