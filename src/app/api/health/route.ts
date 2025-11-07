import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const hasMongoUri = !!process.env.MONGODB_URI;
  
  return NextResponse.json({ 
    status: 'ok',
    mongodb: hasMongoUri ? 'configured' : 'missing',
    timestamp: new Date().toISOString()
  });
}
