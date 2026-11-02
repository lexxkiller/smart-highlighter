import { useState, useRef, useCallback, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import InteractiveDemo from './components/InteractiveDemo';
import FeaturesSection from './components/FeaturesSection';
import CodeViewer from './components/CodeViewer';
import SettingsDemo from './components/SettingsDemo';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
              SH
            </div>
            <span className="font-semibold text-lg">Smart Highlighter</span>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <HeroSection darkMode={darkMode} />
      <InteractiveDemo darkMode={darkMode} />
      <FeaturesSection darkMode={darkMode} />
      <SettingsDemo darkMode={darkMode} />
      <CodeViewer darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
