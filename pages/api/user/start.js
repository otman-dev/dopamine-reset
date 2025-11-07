import clientPromise from '../../../lib/mongodb';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
      
      res.status(200).json({ userId, startDate: startDate.toISOString() });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
