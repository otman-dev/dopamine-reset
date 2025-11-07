import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { phaseData } from '../phaseData';

export default function Home() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [currentHour, setCurrentHour] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');

  // Load user data from URL or localStorage
  useEffect(() => {
    const loadUserData = async () => {
      const urlUserId = router.query.id;
      
      if (urlUserId) {
        // Load from database using URL parameter
        try {
          const response = await fetch(`/api/user/${urlUserId}`);
          if (response.ok) {
            const data = await response.json();
            setUserId(data.userId);
            setStartDate(new Date(data.startDate));
            setIsActive(true);
            if (typeof window !== 'undefined') {
              localStorage.setItem('dopamineResetUserId', data.userId);
              setShareUrl(`${window.location.origin}?id=${data.userId}`);
            }
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      } else if (typeof window !== 'undefined') {
        // Try to load from localStorage
        const savedUserId = localStorage.getItem('dopamineResetUserId');
        if (savedUserId) {
          try {
            const response = await fetch(`/api/user/${savedUserId}`);
            if (response.ok) {
              const data = await response.json();
              setUserId(data.userId);
              setStartDate(new Date(data.startDate));
              setIsActive(true);
              setShareUrl(`${window.location.origin}?id=${data.userId}`);
            } else {
              // User not found, clear localStorage
              localStorage.removeItem('dopamineResetUserId');
            }
          } catch (error) {
            console.error('Failed to load user data:', error);
          }
        }
      }
      setLoading(false);
    };

    if (router.isReady) {
      loadUserData();
    }
  }, [router.isReady, router.query.id]);

  // Update current day and hour based on elapsed time since start
  useEffect(() => {
    if (!startDate) return;

    const updateProgress = () => {
      const now = new Date();
      const diffMs = now - startDate;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      const hourInCurrentDay = diffHours % 24;

      // Calculate which day of the program (1-14)
      const programDay = Math.min(diffDays + 1, 14);
      setCurrentDay(programDay);
      setCurrentHour(hourInCurrentDay);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [startDate]);

  const handleStart = async () => {
    try {
      const response = await fetch('/api/user/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
        setStartDate(new Date(data.startDate));
        setIsActive(true);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('dopamineResetUserId', data.userId);
          const url = `${window.location.origin}?id=${data.userId}`;
          setShareUrl(url);
        }
        
        // Update URL without reload
        router.push(`/?id=${data.userId}`, undefined, { shallow: true });
      } else {
        const errorData = await response.json();
        console.error('Start failed:', errorData);
        alert('Failed to start. Please check if MongoDB is configured in Vercel environment variables.');
      }
    } catch (error) {
      console.error('Failed to start program:', error);
      alert('Failed to start. Please try again or check your internet connection.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      setStartDate(null);
      setIsActive(false);
      setCurrentDay(0);
      setCurrentHour(0);
      setUserId(null);
      setShareUrl('');
      localStorage.removeItem('dopamineResetUserId');
      router.push('/', undefined, { shallow: true });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied! You can now access your progress from any device.');
  };

  // Get current phase data
  const currentPhaseData = phaseData.find(p => p.day === currentDay);
  const dailyProgress = (currentHour / 24) * 100;
  const overallProgress = ((currentDay - 1) / 14 + (currentHour / 24) / 14) * 100;

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Dopamine Reset Tracker
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            14-Day Cigarette Withdrawal Program
          </p>
        </div>

        {!isActive ? (
          /* Start Screen */
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">🚭</div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Ready to Reclaim Your Life?
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                This 14-day program will guide you through cigarette withdrawal and dopamine recalibration.
                Track your progress automatically with hourly reminders and phase-specific guidance.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-slate-400 mb-2">You'll experience:</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>✓ Phase 1: Withdrawal (Days 1-3)</li>
                  <li>✓ Phase 2: Mental Fog (Days 4-7)</li>
                  <li>✓ Phase 3: Clarity (Days 8-10)</li>
                  <li>✓ Phase 4: Identity Rebuild (Days 11-14)</li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              Start 14-Day Reset
            </button>
          </div>
        ) : (
          /* Active Tracking Screen */
          <div className="space-y-6">
            {/* Current Status Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Current Phase</div>
                  <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                    {currentPhaseData?.phase || 'Loading...'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400 mb-1">Day</div>
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400">
                    {currentDay}/14
                  </div>
                </div>
              </div>

              {/* Daily Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Today's Progress</span>
                  <span>Hour {currentHour}/24</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${dailyProgress}%` }}
                  />
                </div>
              </div>

              {/* Overall Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Streak Display */}
              {currentDay === 14 && currentHour >= 23 ? (
                <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="text-2xl font-bold text-emerald-400 mb-2">Congratulations!</div>
                  <div className="text-slate-300">You've completed the 14-day reset!</div>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-slate-300">
                  <span className="text-3xl">🔥</span>
                  <span className="text-xl font-semibold">{currentDay} day streak</span>
                </div>
              )}
            </div>

            {/* Side Effects Card */}
            {currentPhaseData && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">📋</span>
                  What to Expect Today
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  {currentPhaseData.sideEffects}
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-2">Current Hour Guidance:</div>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {currentPhaseData.hours[currentHour]}
                  </p>
                </div>
              </div>
            )}

            {/* Identity Reminder Card */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-emerald-500/30">
              <div className="text-center">
                <div className="text-3xl mb-3">💪</div>
                <div className="text-xl md:text-2xl font-bold mb-2 text-emerald-300">
                  I Don't Smoke
                </div>
                <div className="text-slate-300">
                  That chapter is closed. I am a non-smoker.
                </div>
              </div>
            </div>

            {/* Share Link Card */}
            {shareUrl && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="text-xl mr-2">🔗</span>
                  Access from Any Device
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  Save this link to track your progress from any device:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-300 truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl transition-all border border-slate-600"
            >
              Reset Progress
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Your progress syncs across all devices via secure link</p>
        </div>
      </div>
    </div>
  );
}
