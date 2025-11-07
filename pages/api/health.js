export default function handler(req, res) {
  const hasMongoUri = !!process.env.MONGODB_URI;
  
  res.status(200).json({ 
    status: 'ok',
    mongodb: hasMongoUri ? 'configured' : 'missing',
    timestamp: new Date().toISOString()
  });
}
