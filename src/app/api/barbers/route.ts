import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('http://localhost:3030/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 60,
    },
  });

  if (res.ok) {
    const data = await res.json();

    return NextResponse.json(data, {
      status: 200,
    });
  }

  return NextResponse.next();
}
