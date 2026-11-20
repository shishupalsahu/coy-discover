import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

const MatchModal = ({ matchedProfile, onClose, onGoToMatches }) => {
  if (!matchedProfile) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white"
    >
      <motion.div
        initial={{ scale: 0.7, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-full max-w-xs flex flex-col items-center"
      >
        {/* Match Badge */}
        <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-rose-500/40">
          <Heart size={32} className="fill-white text-white" />
        </div>

        <h2 className="text-4xl font-extrabold italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 mb-2">
          It's a match!
        </h2>

        <p className="text-sm text-gray-300 mb-6">
          You and <span className="font-semibold text-white">{matchedProfile.name}</span> liked each other.
        </p>

        {/* Matched Profile Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-rose-500 shadow-xl mb-8">
          <img
            src={matchedProfile.photo}
            alt={matchedProfile.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onGoToMatches}
            className="w-full py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 font-semibold text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-500/30"
          >
            <MessageCircle size={18} />
            View Matches
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 font-medium text-gray-200 transition-colors"
          >
            Keep Swiping
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MatchModal;