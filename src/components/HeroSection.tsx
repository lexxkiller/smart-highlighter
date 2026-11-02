export default function HeroSection({ darkMode }: { darkMode: boolean }) {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-amber-500' : 'bg-amber-300'}`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-orange-500' : 'bg-orange-300'}`} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-amber-500/30 bg-amber-500/10 text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Editor Plugin
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Smart Highlighter
          </span>
        </h1>

        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Double-click any word to instantly highlight all its occurrences in your document. 
          A powerful editor plugin that boosts your code navigation productivity.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#demo" className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/25">
            Try Interactive Demo
          </a>
          <a href="#code" className={`px-6 py-3 rounded-xl font-semibold border transition-colors ${darkMode ? 'border-gray-700 hover:border-gray-500 text-gray-300' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}>
            View Source Code
          </a>
        </div>

        {/* Animated code snippet preview */}
        <div className={`mt-12 rounded-2xl p-6 text-left font-mono text-sm max-w-lg mx-auto border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-xl'}`}>
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="space-y-1">
            <div><span className="text-purple-400">DOUBLECLICK</span><span className="text-gray-500">:</span><span className="text-green-400">(v, pos)</span><span className="text-gray-500">{"{"}</span></div>
            <div className="pl-4"><span className="text-blue-400">var</span> sel = v.selection;</div>
            <div className="pl-4"><span className="text-purple-400">if</span> (sel.length &gt; 2) <span className="text-gray-500">{"{"}</span></div>
            <div className="pl-8"><span className="text-amber-400">MenuCmds</span>.<span className="text-green-400">SEARCH_MARKALLEXT5</span>();</div>
            <div className="pl-4"><span className="text-gray-500">{"}"}</span></div>
            <div><span className="text-gray-500">{"}"}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
