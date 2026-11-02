import { useState } from 'react';

export default function SettingsDemo({ darkMode }: { darkMode: boolean }) {
  const [mask, setMask] = useState(0b00000000000000000000000000000101); // indicators 1 and 3 on

  const toggleIndicator = (index: number) => {
    setMask(prev => prev ^ (1 << index));
  };

  const activeCount = Array.from({ length: 32 }, (_, i) => (mask >> i) & 1).filter(Boolean).length;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Settings Panel</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Interactive demo of the indicator mask configuration dialog
          </p>
        </div>

        <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white shadow-xl'}`}>
          {/* Dialog header */}
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Smart Highlighter — Settings</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>
                {activeCount} indicator{activeCount !== 1 ? 's' : ''} active
              </span>
            </div>
          </div>

          {/* Indicator grid */}
          <div className="p-6">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {Array.from({ length: 32 }, (_, i) => {
                const isActive = ((mask >> i) & 1) === 1;
                return (
                  <button
                    key={i}
                    onClick={() => toggleIndicator(i)}
                    className={`relative p-3 rounded-xl border-2 transition-all duration-200 font-mono text-sm ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-lg shadow-amber-500/10'
                        : darkMode
                          ? 'border-gray-800 bg-gray-800/50 text-gray-500 hover:border-gray-600'
                          : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{i + 1}</div>
                    {isActive && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mask value display */}
            <div className={`mt-6 p-4 rounded-xl font-mono text-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>mask (hex)</span>
                <span className="text-amber-400">0x{mask.toString(16).padStart(8, '0').toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>mask (binary)</span>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {mask.toString(2).padStart(32, '0')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>mask (decimal)</span>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{mask}</span>
              </div>
            </div>

            {/* Bit visualization */}
            <div className={`mt-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Bit positions (31 → 0)</div>
              <div className="flex gap-0.5 flex-wrap">
                {Array.from({ length: 32 }, (_, i) => {
                  const bitIndex = 31 - i;
                  const isActive = ((mask >> bitIndex) & 1) === 1;
                  return (
                    <div
                      key={i}
                      className={`w-5 h-7 flex items-center justify-center text-xs font-mono rounded-sm ${
                        isActive
                          ? 'bg-amber-500 text-white'
                          : darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isActive ? '1' : '0'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
