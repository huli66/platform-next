import { NextResponse, NextRequest } from "next/server";
import crypto from 'crypto';
import { nodeApiUrl } from "../consts";

const loginUrl = `${nodeApiUrl}/login`;

function md5(text: string) {
  return crypto.createHash('md5').update(text).digest('hex');
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const res = await fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify({ username, password: md5(password), gatewayToken: true }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (res.status === 200) {
    const data = await res.json();
    return NextResponse.json(data);
  }

  const data = await res.text();
  return NextResponse.json({ raw: data });
}