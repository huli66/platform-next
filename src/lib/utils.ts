import { clsx, type ClassValue } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type NextFunction = () => NextResponse;

export function chain(functions: ((next: NextFunction) => NextResponse)[], index = 0): NextFunction {
  const current = functions[index];
  if (current) {
    const next = chain(functions, index + 1);
    return () => current(next);
  }
  return () => NextResponse.next();
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

