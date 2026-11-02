import { useState } from 'react';

const PLUGIN_CODE = `(function(){

var settings = GlobalSettings.get("SmartHighlighter")||{mask:0xffffffff};

function getIndicatorMask(){
\treturn firstView.navBarIndicatorMask | secondView.navBarIndicatorMask;
}

function setIndicatorMask(value){
\tfirstView.navBarIndicatorMask = value;
\tsecondView.navBarIndicatorMask = value;
}

setIndicatorMask(settings.mask);

var smMenu = Editor.addMenu("Smart Highlighter");
smMenu.addItem({
\ttext:"Settings",
\tcmd:function(m){
\t\tvar rows = [];
\t\tvar mask = getIndicatorMask();
\t\t
\t\tfor(var i=0; i<32; i++){
\t\t\trows.push(this.getCells((mask & (1<<i)) != 0, i));
\t\t}

\t\tthis.showDialog(rows);\t
\t},
\tgetCells:function(isOn, indicatorNr){
\t\tvar checked = isOn ? "checked=''" : "";
\t\treturn ["<input type='checkbox' "+checked+" name='"+indicatorNr+"'>",indicatorNr + 1];
\t},

\tshowDialog:function(rules){
\t\tvar dialCfg = new Dialog.Grid({
\t\t\ttitle : "Smart Highlighter - Settings",
\t\t\trows  : rules,
\t\t\theader: ["","Indicator Number"],
\t\t\tclientHeight: 200,
\t\t\tclientWidth: 400,
\t\t\tonRowClick:function(cell, target){
\t\t\t\tvar row = cell.parentNode;

\t\t\t\tif (target.tagName != "INPUT"){
\t\t\t\t\ttarget = row.cells[0].firstChild;
\t\t\t\t\tthis.toggle(target);
\t\t\t\t}
\t\t\t\t
\t\t\t\tvar mask = getIndicatorMask();
\t\t\t\tvar indicatorNr = target.getAttribute("name")*1;
\t\t\t\tif (!target.checked)
\t\t\t\t\tsetIndicatorMask(mask & (~(1<<indicatorNr)));
\t\t\t\telse
\t\t\t\t\tsetIndicatorMask(mask | (1<<indicatorNr));
\t\t\t\tsettings.mask = getIndicatorMask();
\t\t\t\tGlobalSettings.set("SmartHighlighter", settings);
\t\t\t},
\t\t\ttoggle:function(checkbox){
\t\t\t\tcheckbox.checked = !checkbox.checked;
\t\t\t}
\t\t});
\t\t
\t\tnew Dialog(dialCfg);
\t}
});

GlobalListener.addListener({
\tlastHighlighted : null,
\tuui:1,
\tlinesLimit: 80000,
\tHideNavBar:function(v){
\t\tvar xml = (Editor.langs[v.lang]=='XML')? 4 : 1;
\t\tvar hide = v.lines.count > (this.linesLimit / xml);
\t\tv.navBarHidden = hide;
\t},
\tUPDATEUI:function(v){
\t\tthis.HideNavBar(v);

\t\tif (v.navBarHidden)
\t\t\treturn;
\t\t
\t\tif (this.lastHighlighted!=null && this.lastHighlighted != v.bytePos){
\t\t\tMenuCmds.SEARCH_UNMARKALLEXT5();
\t\t}
\t},
\tBUFFERACTIVATED:function(v,pos){
\t\tthis.HideNavBar(v);
\t},
\tDOUBLECLICK:function(v, pos){
\t\tif (v.navBarHidden)
\t\t\treturn;
\t\t\t
\t\tif (this.lastHighlighted != null){
\t\t\tMenuCmds.SEARCH_UNMARKALLEXT5();
\t\t\tthis.lastHighlighted = null;
\t\t}
\t\t
\t\tvar sel = v.selection;
\t\t
\t\tif (sel.length > 2){
\t\t\tif (this.lastHighlighted != v.bytePos){
\t\t\t\tMenuCmds.SEARCH_MARKALLEXT5();
\t\t\t\tthis.lastHighlighted = v.bytePos;
\t\t\t}else{
\t\t\t\tthis.lastHighlighted = null;
\t\t\t}
\t\t}
\t}
});

})();`;

// Simple syntax highlighting
function highlightJS(code: string): string {
  // Escape HTML
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Strings
  html = html.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="syn-string">$1</span>');
  
  // Comments
  html = html.replace(/(\/\/.*$)/gm, '<span class="syn-comment">$1</span>');
  
  // Keywords
  html = html.replace(/\b(var|function|return|if|else|for|new|this|typeof|null|true|false)\b/g, '<span class="syn-keyword">$1</span>');
  
  // Numbers
  html = html.replace(/\b(0x[0-9a-fA-F]+|\d+)\b/g, '<span class="syn-number">$1</span>');
  
  // Functions/methods
  html = html.replace(/\.([a-zA-Z_]\w*)\s*\(/g, '.<span class="syn-method">$1</span>(');
  
  // Built-in objects
  html = html.replace(/\b(GlobalSettings|GlobalListener|Editor|MenuCmds|Dialog)\b/g, '<span class="syn-object">$1</span>');

  return html;
}

export default function CodeViewer({ darkMode }: { darkMode: boolean }) {
  const [copied, setCopied] = useState(false);
  const lines = PLUGIN_CODE.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(PLUGIN_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="code" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Source Code</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete plugin source — {lines.length} lines of JavaScript
          </p>
        </div>

        <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'border-gray-800' : 'border-gray-200 shadow-xl'}`}>
          {/* Code header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className={`text-xs font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                SmartHighlighter.js
              </span>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-all ${
                copied
                  ? 'bg-green-500/20 text-green-400'
                  : darkMode
                    ? 'bg-gray-800 text-gray-400 hover:text-gray-200'
                    : 'bg-gray-200 text-gray-600 hover:text-gray-800'
              }`}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>

          {/* Code content */}
          <div className={`overflow-auto max-h-[500px] ${darkMode ? 'bg-gray-950' : 'bg-gray-900'}`}>
            <pre className="p-4 text-sm leading-relaxed">
              <code>
                {lines.map((line, i) => (
                  <div key={i} className="flex hover:bg-white/5">
                    <span className="inline-block w-10 text-right pr-4 select-none text-gray-600 text-xs leading-relaxed flex-shrink-0">
                      {i + 1}
                    </span>
                    <span
                      className="flex-1 text-gray-200"
                      dangerouslySetInnerHTML={{ __html: highlightJS(line) || '&nbsp;' }}
                    />
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>

        {/* Syntax color legend */}
        <div className={`mt-4 flex flex-wrap gap-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <span><span className="text-purple-400">■</span> Keywords</span>
          <span><span className="text-green-400">■</span> Strings</span>
          <span><span className="text-amber-400">■</span> Numbers</span>
          <span><span className="text-blue-400">■</span> Methods</span>
          <span><span className="text-cyan-400">■</span> Objects</span>
          <span><span className="text-gray-500">■</span> Comments</span>
        </div>
      </div>

      {/* Syntax highlighting styles */}
      <style>{`
        .syn-keyword { color: #c084fc; }
        .syn-string { color: #4ade80; }
        .syn-number { color: #fbbf24; }
        .syn-method { color: #60a5fa; }
        .syn-object { color: #22d3ee; }
        .syn-comment { color: #6b7280; font-style: italic; }
      `}</style>
    </section>
  );
}
