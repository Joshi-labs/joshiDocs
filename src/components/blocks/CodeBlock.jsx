import React from "react";

const CodeBlock = ({ code, language }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-slate-700 bg-[#0d1117] shadow-xl">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
      <span className="text-xs font-mono text-slate-400 uppercase">{language}</span>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
      </div>
    </div>
    <div className="p-4 overflow-x-auto custom-scrollbar">
      <pre className="text-sm font-mono text-slate-200"><code>{code}</code></pre>
    </div>
  </div>
);

export default CodeBlock;