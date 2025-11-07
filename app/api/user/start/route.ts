import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { nanoid } from 'nanoid';

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db('dopamine-reset');
    
    const userId = nanoid(10);
    const startDate = new Date();
    
    await db.collection('users').insertOne({
      userId,
      startDate,
      createdAt: new Date(),
    });
    
    return NextResponse.json({ 
      userId, 
      startDate: startDate.toISOString() 
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
