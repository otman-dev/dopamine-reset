import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { userId } = req.query;
  
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('dopamine-reset');
      
      const user = await db.collection('users').findOne({ userId });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json({ 
        userId: user.userId, 
        startDate: user.startDate.toISOString() 
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
