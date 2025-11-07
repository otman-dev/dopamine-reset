import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    mongodb: !!process.env.MONGODB_URI ? 'configured' : 'missing',
    timestamp: new Date().toISOString()
  });
}
