import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { X, Heart, RefreshCw } from 'lucide-react';
import SwipeCard from './SwipeCard';
import MatchModal from './MatchModal';

const API_URL = 'http://localhost:5000';

const DiscoverTab = ({ onNavigateToMatches }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchedProfile, setMatchedProfile] = useState(null);

  // Fetch un-swiped profiles from backend on mount
  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/feed`);
      setProfiles(res.data);
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle swipe action (via drag gesture or desktop buttons)
  const handleSwipe = async (profileId, direction) => {
    // Find the swiped profile details before removing it from state
    const swipedProfile = profiles.find((p) => p.id === profileId);

    // Optimistically remove the card from UI immediately for smooth UX
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));

    try {
      const res = await axios.post(`${API_URL}/swipe`, {
        profileId,
        direction,
      });

      // If mutual match occurred, trigger the "It's a match!" modal
      if (res.data.isMatch && swipedProfile) {
        setMatchedProfile(swipedProfile);
      }
    } catch (error) {
      console.error('Error recording swipe:', error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <RefreshCw className="animate-spin mb-2 text-rose-500" size={28} />
        <p className="text-sm font-medium">Finding people near you...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Cards Deck Area */}
      <div className="flex-1 relative">
        {profiles.length > 0 ? (
          <AnimatePresence>
            {/* Render in reverse so the first item in array sits on top of the stack */}
            {[...profiles].reverse().map((profile, index, arr) => {
              const isTopCard = index === arr.length - 1;
              return (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  onSwipe={handleSwipe}
                  isTopCard={isTopCard}
                />
              );
            })}
          </AnimatePresence>
        ) : (
          /* Empty State when no profiles are left */
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              You're all caught up!
            </h3>
            <p className="text-sm text-gray-500">
              There are no more profiles to discover right now. Check back later!
            </p>
          </div>
        )}
      </div>

      {/* Desktop Action Buttons (Visible when profiles exist) */}
      {profiles.length > 0 && (
        <div className="pb-5 pt-2 flex justify-center items-center gap-6 z-10">
          <button
            onClick={() => handleSwipe(profiles[0].id, 'pass')}
            aria-label="Pass"
            className="w-14 h-14 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all"
          >
            <X size={28} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => handleSwipe(profiles[0].id, 'like')}
            aria-label="Like"
            className="w-14 h-14 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-emerald-500 hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all"
          >
            <Heart size={28} strokeWidth={2.5} className="fill-emerald-500" />
          </button>
        </div>
      )}

      {/* Mutual Match Popup Modal */}
      <AnimatePresence>
        {matchedProfile && (
          <MatchModal
            matchedProfile={matchedProfile}
            onClose={() => setMatchedProfile(null)}
            onGoToMatches={() => {
              setMatchedProfile(null);
              onNavigateToMatches();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverTab;