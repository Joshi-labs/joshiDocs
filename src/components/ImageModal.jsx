import React, { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const ImageModal = ({ src, alt, caption, onClose }) => {
  if (!src) return null;

  // Lock Body Scroll on Mount
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Top Bar with Close Button */}
      <div className="absolute top-0 right-0 z-[110] p-4">
         <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 hover:text-red-400 transition-all border border-slate-700"
            aria-label="Close Image Viewer"
          >
            <X size={24} />
          </button>
      </div>

      {/* Main Area - FIXED */}
      {/* 1. Removed 'flex items-center justify-center' so the container fills the screen fully */}
      <div className="flex-grow relative w-full h-full overflow-hidden">
        <TransformWrapper
          initialScale={0.8}
          minScale={0.5}
          maxScale={8} 
          centerOnInit={true}
          wheel={{ step: 0.33 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* 2. Forced the Wrapper to take 100% width/height of the parent */}
              <TransformComponent 
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <img 
                  src={src} 
                  alt={alt} 
                  // 3. Image fits screen initially (max-h/max-w), but TransformScale handles the zoom
                  className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing shadow-2xl" 
                />
              </TransformComponent>

              {/* Controls (Bottom Center) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[102] flex gap-2 p-2 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-sm shadow-2xl pointer-events-auto">
                  <button onClick={() => zoomIn()} className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors" title="Zoom In">
                      <ZoomIn size={20} />
                  </button>
                  <button onClick={() => zoomOut()} className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors" title="Zoom Out">
                      <ZoomOut size={20} />
                  </button>
                  <button onClick={() => resetTransform()} className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors" title="Reset View">
                      <Maximize size={20} />
                  </button>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Caption Bar (Bottom) */}
      {caption && (
        <div className="p-4 text-center z-[105] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none relative">
          <span className="inline-block text-sm text-slate-300 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-sm mb-12">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageModal;