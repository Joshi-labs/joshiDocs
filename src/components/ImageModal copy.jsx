import React, { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const ImageModal = ({ src, alt, caption, onClose }) => {
  if (!src) return null;

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    //document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Top Bar with Controls and Close Button */}
      <div className="relative z-[102] flex justify-between items-center p-4 pointer-events-none">
          {/* Close Button (Right side) */}
         <button 
            onClick={onClose} 
            className="pointer-events-auto p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 hover:text-red-400 transition-all border border-slate-700 ml-auto"
            aria-label="Close Image Viewer"
          >
            <X size={24} />
          </button>
      </div>

      {/* Zoomable Area */}
      <div className="flex-grow flex items-center justify-center overflow-hidden relative w-full h-full p-4 pt-0">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={8} // Allow significant zooming
          centerOnInit={true}
          wheel={{ step: 0.2 }} // Smoother wheel zooming
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Zoom Controls (Top Left - floated absolutely) */}
              <div className="absolute top-0 left-4 z-[102] flex gap-2 p-1.5 rounded-lg bg-slate-800/90 border border-slate-700 shadow-xl">
                  <button onClick={() => zoomIn()} className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white" title="Zoom In">
                      <ZoomIn size={20} />
                  </button>
                  <button onClick={() => zoomOut()} className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white" title="Zoom Out">
                      <ZoomOut size={20} />
                  </button>
                  <button onClick={() => resetTransform()} className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white" title="Reset View">
                      <Maximize size={20} />
                  </button>
              </div>

              {/* The actual zoomable content */}
              <TransformComponent wrapperClass="w-full h-full flex items-center justify-center" contentClass="flex items-center justify-center">
                <img 
                  src={src} 
                  alt={alt} 
                  // Use max-h/max-w to ensure it fits initially, then let transform handle the rest
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-2xl cursor-grab active:cursor-grabbing" 
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Caption Bar (Bottom) */}
      {caption && (
        <div className="p-4 text-center z-[102] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
          <span className="inline-block text-sm text-slate-300 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-sm">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageModal;