import { Suspense } from 'react';
import TrackerClient from '@/components/TrackerClient';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    }>
      <TrackerClient />
    </Suspense>
  );
}
