import React from "react";
import { FileText, Download } from "lucide-react";

const PdfBlock = ({ src, title }) => (
  <div className="my-8">
    <div
      className="relative w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl"
      style={{ height: '600px' }}
    >
      <iframe
        src={src}
        title={title || "PDF Document"}
        className="w-full h-full"
        frameBorder="0"
      />
    </div>
    <div className="mt-3 flex items-center justify-center gap-4">
      {title && (
        <div className="flex items-center gap-2 text-sm text-slate-500 italic">
          <FileText size={14} />
          <span>{title}</span>
        </div>
      )}
      <a
      
        href={src}
        download
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-medium transition-colors"
      >
        <Download size={13} />
        Download PDF
      </a>
    </div>
  </div>
);

export default PdfBlock;