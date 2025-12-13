import React from "react";
import { Image as ImageIcon } from "lucide-react";

const ImageBlock = ({ src, alt, caption, onImageClick }) => (
  <div className="my-8 group cursor-zoom-in" onClick={() => onImageClick({ src, alt, caption })}>
    <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50 shadow-2xl transition-all duration-300 hover:border-blue-500">
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        // Use object-scale-down to ensure large diagrams don't get cropped poorly in thumbnail view
        className="w-full h-auto object-scale-down max-h-[500px] bg-[#0f111a] transition-transform duration-300 group-hover:scale-[1.01]" 
      />
    </div>
    {caption && (
      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
        <ImageIcon size={14} />
        <span className="italic">{caption}</span>
      </div>
    )}
  </div>
);

export default ImageBlock;