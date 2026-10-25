export default function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer className={`py-12 px-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                SH
              </div>
              <span className="font-semibold">Smart Highlighter</span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              A lightweight editor plugin for instant word highlighting with configurable indicator masks.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">How It Works</h4>
            <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <li>• Listens for double-click events</li>
              <li>• Extracts selected word from editor</li>
              <li>• Calls SEARCH_MARKALLEXT5 command</li>
              <li>• Tracks state for toggle behavior</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Architecture</h4>
            <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <li>• IIFE pattern (self-executing)</li>
              <li>• GlobalListener event system</li>
              <li>• Dialog.Grid for settings UI</li>
              <li>• GlobalSettings for persistence</li>
            </ul>
          </div>
        </div>

        <div className={`pt-6 border-t text-center text-xs ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
          <p>Smart Highlighter Plugin — Editor Extension Documentation</p>
          <p className="mt-1">Built with React + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
