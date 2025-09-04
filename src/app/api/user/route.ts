import { NextResponse, NextRequest } from "next/server";
import { nodeApiUrl } from "../consts";
import { cookies } from "next/headers";

const userUrl = `${nodeApiUrl}`;

export async function GET() {
  const cookiesList = await cookies();
  const allCookies = cookiesList.getAll();
  
  // 将 cookies 转换为 Cookie header 字符串
  const cookieHeader = allCookies
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
  
  const res = await fetch(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader && { 'Cookie': cookieHeader }),
    },
  });
  const contentType = res.headers.get('content-type') || '';

  if (res.status === 200 && contentType.includes('application/json')) {
    const data = await res.json();
    // 直接返回上游对象，而不是再包一层 { data }
    return NextResponse.json(data);
  }
  // 兜底：非 JSON 时返回原始文本，避免解析错误
  const text = await res.text();
  return NextResponse.json({ raw: text });
}