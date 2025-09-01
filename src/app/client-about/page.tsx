'use client';

import { Button } from '@/components/ui/button';
import { notFound, usePathname } from 'next/navigation';
import { useEffect } from 'react';


export default function About() {
  const pathname = usePathname();
  console.log('render')

  useEffect(() => {
    console.log('pathname', pathname);
  }, [pathname]);

  const handleNotFound = () => {
    console.log('handleNotFound');
    notFound(); // 客户端组件不会触发
  }
  const handleError = () => {
    console.log('handleError');
    throw new Error('Error');
  }
  return (
    <div>
      <Button onClick={handleNotFound}>Click to not found</Button>
      <Button onClick={handleError}>Click to error</Button>
    </div>
  );
}