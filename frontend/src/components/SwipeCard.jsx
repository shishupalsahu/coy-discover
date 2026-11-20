import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';

const SwipeCard = ({ profile, onSwipe, isTopCard }) => {
  // Track horizontal drag position
  const x = useMotionValue(0);
  
  // Rotate the card slightly as the user drags it left or right
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  
  // Control opacity of "LIKE" and "NOPE" stamps based on drag distance
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  // Trigger swipe action when user releases the drag past threshold
  const handleDragEnd = (_, info) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      onSwipe(profile.id, 'like');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe(profile.id, 'pass');
    }
  };

  return (
    <motion.div
      style={{ x: isTopCard ? x : 0, rotate: isTopCard ? rotate : 0 }}
      drag={isTopCard ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="absolute inset-4 rounded-3xl overflow-hidden shadow-lg bg-white select-none cursor-grab active:cursor-grabbing border border-gray-200"
    >
      {/* Profile Image */}
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Dark gradient overlay at the bottom for readable text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* LIKE Stamp (Visible on right drag) */}
      {isTopCard && (
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-6 border-4 border-emerald-400 text-emerald-400 font-extrabold text-3xl px-4 py-1 rounded-xl -rotate-12 pointer-events-none tracking-wider"
        >
          LIKE
        </motion.div>
      )}

      {/* NOPE Stamp (Visible on left drag) */}
      {isTopCard && (
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 right-6 border-4 border-rose-500 text-rose-500 font-extrabold text-3xl px-4 py-1 rounded-xl rotate-12 pointer-events-none tracking-wider"
        >
          NOPE
        </motion.div>
      )}

      {/* Profile Information */}
      <div className="absolute bottom-0 inset-x-0 p-6 text-white pointer-events-none">
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <span className="text-2xl font-light text-gray-200">{profile.age}</span>
        </div>

        <div className="flex items-center gap-1 text-gray-300 text-sm mt-1">
          <MapPin size={15} />
          <span>{profile.city}</span>
        </div>

        <p className="text-sm text-gray-100 mt-2.5 line-clamp-2">
          {profile.bio}
        </p>

        {/* Interests Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {profile.interests.map((interest, idx) => (
            <span
              key={idx}
              className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;