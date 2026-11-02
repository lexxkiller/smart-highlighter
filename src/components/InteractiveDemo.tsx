import { useState, useCallback, useRef } from 'react';

const SAMPLE_TEXT = `function calculateTotal(items, taxRate) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  const tax = total * taxRate;
  return total + tax;
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(amount);
}

const items = [
  { name: 'Widget', price: 29.99, quantity: 3 },
  { name: 'Gadget', price: 49.99, quantity: 1 },
  { name: 'Widget', price: 29.99, quantity: 2 }
];

const total = calculateTotal(items, 0.08);
console.log(formatCurrency(total, 'USD'));`;

const HIGHLIGHT_COLORS = [
  'bg-amber-400/30 border-b-2 border-amber-400',
  'bg-blue-400/30 border-b-2 border-blue-400',
  'bg-green-400/30 border-b-2 border-green-400',
  'bg-pink-400/30 border-b-2 border-pink-400',
  'bg-purple-400/30 border-b-2 border-purple-400',
];

export default function InteractiveDemo({ darkMode }: { darkMode: boolean }) {
  const [text] = useState(SAMPLE_TEXT);
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [customText, setCustomText] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const activeText = useCustom ? customText : text;

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    
    const selectedText = selection.toString().trim();
    
    if (selectedText.length > 2 && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(selectedText)) {
      if (highlightedWord === selectedText) {
        setHighlightedWord(null);
        setMatchCount(0);
      } else {
        setHighlightedWord(selectedText);
        const regex = new RegExp(`\\b${escapeRegex(selectedText)}\\b`, 'g');
        const matches = activeText.match(regex);
        setMatchCount(matches ? matches.length : 0);
        setColorIndex((prev) => (prev + 1) % HIGHLIGHT_COLORS.length);
      }
    }
  }, [highlightedWord, activeText]);

  const clearHighlight = () => {
    setHighlightedWord(null);
    setMatchCount(0);
  };

  function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function renderHighlightedText(content: string) {
    if (!highlightedWord) {
      return <span>{content}</span>;
    }

    const regex = new RegExp(`(\\b${escapeRegex(highlightedWord)}\\b)`, 'g');
    const parts = content.split(regex);
    
    return parts.map((part, i) => {
      if (part === highlightedWord) {
        return (
          <mark
            key={i}
            className={`${HIGHLIGHT_COLORS[colorIndex]} rounded px-0.5 transition-all duration-200`}
          >
            {part}
          </mark>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <section id="demo" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            Interactive Demo
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Double-click any word (3+ characters) in the editor below to highlight all occurrences
          </p>
        </div>

        {/* Editor */}
        <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white shadow-xl'}`}>
          {/* Toolbar */}
          <div className={`flex items-center justify-between px-4 py-2 border-b ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className={`text-xs ml-2 font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                sample.js
              </span>
            </div>
            <div className="flex items-center gap-3">
              {highlightedWord && (
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>
                    "{highlightedWord}" — {matchCount} match{matchCount !== 1 ? 'es' : ''}
                  </span>
                  <button
                    onClick={clearHighlight}
                    className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}
              <button
                onClick={() => setUseCustom(!useCustom)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  useCustom
                    ? 'bg-green-500/20 text-green-400'
                    : darkMode ? 'bg-gray-800 text-gray-400 hover:text-gray-200' : 'bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
              >
                {useCustom ? '✓ Custom Text' : 'Edit Text'}
              </button>
            </div>
          </div>

          {/* Editor content */}
          <div className="relative">
            {useCustom ? (
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className={`w-full min-h-[300px] p-4 font-mono text-sm resize-none focus:outline-none ${
                  darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
                }`}
                placeholder="Type your text here, then switch back to preview mode and double-click words..."
              />
            ) : (
              <div
                ref={editorRef}
                onDoubleClick={handleDoubleClick}
                className={`p-4 font-mono text-sm leading-relaxed cursor-text select-text min-h-[300px] whitespace-pre-wrap ${
                  darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
                }`}
              >
                {activeText.split('\n').map((line, lineIdx) => (
                  <div key={lineIdx} className="flex">
                    <span className={`inline-block w-8 text-right mr-4 select-none ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                      {lineIdx + 1}
                    </span>
                    <span>{renderHighlightedText(line)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className={`mt-6 grid grid-cols-1 md:grid-cols-3 gap-4`}>
          {[
            { icon: '👆', title: 'Double-Click', desc: 'Double-click any word (3+ chars) to highlight' },
            { icon: '🔄', title: 'Toggle', desc: 'Click the same word again to remove highlights' },
            { icon: '✏️', title: 'Custom Text', desc: 'Click "Edit Text" to try with your own content' },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'}`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-sm mb-1">{item.title}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
