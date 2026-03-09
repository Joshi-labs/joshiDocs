import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, FileText, Download } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PdfBlock = ({ src, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [current, setCurrent] = useState(1);
  const [pending, setPending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const onPageRenderSuccess = () => {
    if (pageRef.current && !containerHeight) {
      setContainerHeight(pageRef.current.offsetHeight);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const navigate = (target) => {
    if (target < 1 || target > numPages || target === current || pending) return;
    setPending(target);
  };

  const onPendingRenderSuccess = () => {
    setCurrent(pending);
    setPending(null);
  };

  return (
    <div className="my-8 select-none">
      <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#0d0f1a]">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-700/60">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <FileText size={14} />
            <span className="italic">{title || "Document"}</span>
          </div>
          <a
            href={src}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-medium"
          >
            <Download size={13} />
            Download
          </a>
        </div>

        {/* PDF Area */}
        <div ref={containerRef} className="w-full overflow-hidden relative" style={{ minHeight: containerHeight || 'auto' }}>
          {loading && (
            <div className="flex flex-col items-center gap-3 text-slate-500 py-20">
              <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-xs">Loading PDF...</span>
            </div>
          )}

          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
            error={
              <div className="flex items-center justify-center py-20 text-red-400 text-sm">
                Failed to load PDF.
              </div>
            }
          >
            {containerWidth && (
              <div ref={pageRef} className="transition-opacity duration-200" style={{ opacity: pending ? 0.4 : 1 }}>
                <Page
                  pageNumber={current}
                  width={containerWidth}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  onRenderSuccess={onPageRenderSuccess}
                  loading=""
                />
              </div>
            )}

            {pending && containerWidth && (
              <div className="absolute inset-0 opacity-0 pointer-events-none">
                <Page
                  pageNumber={pending}
                  width={containerWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onRenderSuccess={onPendingRenderSuccess}
                  loading=""
                />
              </div>
            )}
          </Document>
        </div>

        {/* Bottom Controls */}
        {!loading && (
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-t border-slate-700/60 backdrop-blur-sm">
            <button
              onClick={() => navigate(current - 1)}
              disabled={current === 1 || !!pending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <div className="flex items-center gap-2">
              {pending && (
                <div className="w-3 h-3 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
              )}
              <span className="text-xs font-mono text-slate-400">
                {pending ? `${current} → ${pending}` : `${current} / ${numPages}`}
              </span>
            </div>

            <button
              onClick={() => navigate(current + 1)}
              disabled={current === numPages || !!pending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfBlock;