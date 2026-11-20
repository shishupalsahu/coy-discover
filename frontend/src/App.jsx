import React, { useState } from 'react';
import { Home, Flame, MessageCircle } from 'lucide-react';
import HomeTab from './components/HomeTab';
import DiscoverTab from './components/DiscoverTab';
import MatchesTab from './components/MatchesTab';

function App() {
  // State to track which tab is currently active ('home', 'discover', or 'matches')
  const [activeTab, setActiveTab] = useState('discover');

  return (
    // Outer container to center the mobile view on desktop screens
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      
      {/* Mobile-first app frame */}
      <div className="w-full max-w-md h-screen sm:h-[800px] bg-white sm:rounded-3xl sm:shadow-xl flex flex-col overflow-hidden relative border border-gray-200">
        
        {/* Top Header */}
        <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-rose-500">
            coy
          </h1>
          <span className="text-xs font-medium bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">
            Beta
          </span>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-gray-50">
          {activeTab === 'home' && <HomeTab />}
          
          {activeTab === 'discover' && (
            <DiscoverTab onNavigateToMatches={() => setActiveTab('matches')} />
          )}

          {activeTab === 'matches' && <MatchesTab />}
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="border-t border-gray-200 bg-white px-6 py-3 flex justify-around items-center z-10">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-[11px] font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'discover' ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Flame size={24} />
            <span className="text-[11px] font-medium">Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'matches' ? 'text-rose-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-[11px] font-medium">Matches</span>
          </button>
        </nav>

      </div>
    </div>
  );
}

export default App;