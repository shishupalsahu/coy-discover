import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MapPin, RefreshCw } from 'lucide-react';

const API_URL = 'http://localhost:5000';

const MatchesTab = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/matches`);
      setMatches(res.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <RefreshCw className="animate-spin mb-2 text-rose-500" size={24} />
        <p className="text-sm">Loading your matches...</p>
      </div>
    );
  }

  return (
    <div className="p-5 h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Mutual Matches ({matches.length})
      </h2>

      {matches.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
            <Heart size={28} />
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            No matches yet
          </h3>
          <p className="text-xs text-gray-500 max-w-xs">
            Keep swiping in the Discover tab! When someone likes you back, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto">
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <img
                src={match.photo}
                alt={match.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-rose-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <h3 className="font-bold text-gray-900 truncate">
                    {match.name}, {match.age}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                  <MapPin size={12} />
                  <span>{match.city}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {match.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesTab;