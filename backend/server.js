const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware to parse JSON and allow cross-origin requests
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'data', 'db.json');

// Helper function to read database
const getDbData = () => {
  const jsonData = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(jsonData);
};

// Helper function to save database
const saveDbData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

// API 1: GET /feed - Returns profiles the user has not yet swiped on
app.get('/feed', (req, res) => {
  const db = getDbData();
  const currentUser = db.currentUser;
  
  // Filter out profiles that the user has already swiped on
  const feedProfiles = db.profiles.filter(
    (profile) => !currentUser.swipedProfiles.includes(profile.id)
  );
  
  res.json(feedProfiles);
});

// API 2: POST /swipe - Records a like or pass and checks for a match
app.post('/swipe', (req, res) => {
  const { profileId, direction } = req.body; // direction is 'like' or 'pass'
  const db = getDbData();
  
  // Add this profile to swiped list so it doesn't appear again
  if (!db.currentUser.swipedProfiles.includes(profileId)) {
    db.currentUser.swipedProfiles.push(profileId);
  }

  let isMatch = false;

  // If user liked the profile, check if the profile has already liked the user
  if (direction === 'like') {
    const swipedProfile = db.profiles.find((p) => p.id === profileId);
    
    if (swipedProfile && swipedProfile.hasLikedUser) {
      isMatch = true;
      // Add to matches if not already present
      if (!db.currentUser.matches.includes(profileId)) {
        db.currentUser.matches.push(profileId);
      }
    }
  }

  // Save updated data to JSON file
  saveDbData(db);
  res.json({ success: true, isMatch });
});

// API 3: GET /matches - Returns the user's mutual matches details
app.get('/matches', (req, res) => {
  const db = getDbData();
  
  // Get full profile details for all matched IDs
  const matchedProfiles = db.profiles.filter(
    (profile) => db.currentUser.matches.includes(profile.id)
  );
  
  res.json(matchedProfiles);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});