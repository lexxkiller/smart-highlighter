export default function FeaturesSection({ darkMode }: { darkMode: boolean }) {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Highlighting',
      description: 'Double-click any word to immediately highlight all occurrences in the document with a visual indicator.',
      code: 'DOUBLECLICK:function(v, pos){...}'
    },
    {
      icon: '🎨',
      title: '32 Indicator Slots',
      description: 'Choose from 32 different indicator masks to color-code different types of highlights simultaneously.',
      code: 'for(var i=0; i<32; i++){...}'
    },
    {
      icon: '💾',
      title: 'Persistent Settings',
      description: 'Your indicator preferences are automatically saved and restored between sessions via GlobalSettings.',
      code: 'GlobalSettings.set("SmartHighlighter", settings)'
    },
    {
      icon: '🚀',
      title: 'Performance Optimized',
      description: 'Automatically hides the navigation bar for files with 80,000+ lines to maintain smooth performance.',
      code: 'linesLimit: 80000'
    },
    {
      icon: '🔄',
      title: 'Toggle Behavior',
      description: 'Click the same word again to toggle highlighting off. Smart state tracking prevents redundant operations.',
      code: 'if (this.lastHighlighted != v.bytePos){...}'
    },
    {
      icon: '📄',
      title: 'XML Aware',
      description: 'Automatically reduces the line limit threshold for XML files (4x) to account for heavier parsing overhead.',
      code: "Editor.langs[v.lang]=='XML'? 4 : 1"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Key Features</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Everything you need for efficient code navigation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'border-gray-800 bg-gray-900/50 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5'
                  : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100'
              }`}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
              <div className={`font-mono text-xs px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-500'}`}>
                {feature.code}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
