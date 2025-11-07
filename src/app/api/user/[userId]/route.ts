import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('dopamine-reset');
    
    const user = await db.collection('users').findOne({ userId: params.userId });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      userId: user.userId, 
      startDate: user.startDate.toISOString() 
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
