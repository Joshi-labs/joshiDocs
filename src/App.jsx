import React, { useState, useEffect, useRef } from 'react';
// ADDED: Imports for zooming functionality and new control icons
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// CHANGE THIS LINE
import { Book, Menu, ChevronRight, Info, AlertTriangle, Zap, ArrowUpRight, Image as ImageIcon, X, Youtube, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
/* -------------------------------------------------------------------------- */
/* MOCK DATA                                                                  */
/* -------------------------------------------------------------------------- */
const MOCK_API_DATA = {
  "projectTitle": "Testing Documentation",
  "version": "v2.0.0-beta",
  "sections": [
    {
      "category": "Basic Elements",
      "items": [
        {
          "id": "typography",
          "title": "Typography & Formatting",
          "content": [
            { "type": "header", "text": "Typography System" },
            { "type": "text", "text": "This is a standard paragraph. It supports **bold text** for emphasis and `inline code` for technical terms like variables or file paths." },
            { "type": "text", "text": "This is a standard paragraph. It supports **bold text** for emphasis and `inline code` for technical terms like variables or file paths." },

            { "type": "header2", "text": "Secondary Heading" },
            { "type": "text", "text": "Secondary headings are used to break down sections into smaller, readable chunks." },
            { "type": "alert", "variant": "info", "title": "Note", "text": "You can combine **bold** and `code` inside alerts too." }
          ]
        },
        {
          "id": "lists",
          "title": "Lists",
          "content": [
            { "type": "header", "text": "List Styles" },
            { "type": "text", "text": "Lists are perfect for feature sets or prerequisites:" },
            { "type": "list", "items": [
                "Server-side Rendering (SSR) support",
                "Fully responsive **mobile layout**",
                "Dark mode enabled by default",
                "Zero-config routing system"
              ]
            }
          ]
        }
      ]
    },
    {
      "category": "Rich Media",
      "items": [
        {
          "id": "code-blocks",
          "title": "Code Blocks",
          "content": [
            { "type": "header", "text": "Syntax Highlighting" },
            { "type": "text", "text": "We support multiple languages. Here is a Javascript example:" },
            { "type": "code", "language": "javascript", "code": "// Initialize the engine\nconst engine = new DocsEngine({\n  theme: 'dark',\n  plugins: ['search', 'analytics']\n});\n\nengine.start();" },
            { "type": "text", "text": "And here is a Python example:" },
            { "type": "code", "language": "python", "code": "# Data Processing Script\ndef process_data(data):\n    return [d for d in data if d['active'] is True]" }
          ]
        },
        {
          "id": "images-video",
          "title": "Images & Video",
          "content": [
            { "type": "header", "text": "Visual Media" },
            { "type": "text", "text": "Images support captions and **zoom-on-click** functionality." },
            { "type": "image", "src": "https://placehold.co/800x400/1e293b/60a5fa?text=Feature+Preview+Banner", "alt": "Feature Banner", "caption": "Figure 1: Main dashboard overview." },
            { "type": "header2", "text": "Video Embedding" },
            { "type": "text", "text": "Embed YouTube videos by ID:" },
            { "type": "video", "videoId": "dQw4w9WgXcQ", "title": "Integration Tutorial" }
          ]
        },
        {
          "id": "alerts",
          "title": "Alert Types",
          "content": [
            { "type": "header", "text": "Callouts" },
            { "type": "alert", "variant": "info", "title": "Info", "text": "General information for the user." },
            { "type": "alert", "variant": "tip", "title": "Tip", "text": "Helpful suggestions or best practices." },
            { "type": "alert", "variant": "warning", "title": "Warning", "text": "Critical information, deprecations, or breaking changes." }
          ]
        }
      ]
    }
  ]
}

/* -------------------------------------------------------------------------- */
/* UTILS & COMPONENTS                                                         */
/* -------------------------------------------------------------------------- */

const processText = (text) => {
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Changed from <b> to ** for markdown style
    html = html.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>'); // Keep support for legacy <b>
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-700/50 text-slate-100 px-1 py-0.5 rounded text-[0.95em]">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

// 1. Image Modal Component (UPDATED WITH PAN & ZOOM)
const ImageModal = ({ src, alt, caption, onClose }) => {
  if (!src) return null;

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
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

// 2. Code Block
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

// 3. Alert Block
const Alert = ({ variant, title, text }) => {
  const styles = {
    info: { border: "border-blue-500/50", bg: "bg-blue-500/10", text: "text-blue-200", icon: <Info size={18} className="text-blue-400" /> },
    warning: { border: "border-amber-500/50", bg: "bg-amber-500/10", text: "text-amber-200", icon: <AlertTriangle size={18} className="text-amber-400" /> },
    tip: { border: "border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-200", icon: <Zap size={18} className="text-emerald-400" /> },
  };
  const style = styles[variant] || styles.info;
  return (
    <div className={`my-6 p-4 rounded-lg border ${style.border} ${style.bg} flex gap-3 items-start`}>
      <div className="mt-0.5 shrink-0">{style.icon}</div>
      <div>
        <h4 className={`font-semibold text-sm ${style.text} mb-1`}>{title}</h4>
        <p className="text-sm text-slate-300 leading-relaxed">{processText(text)}</p>
      </div>
    </div>
  );
};

// 4. Image Block (Thumbnail in the doc flow)
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

// 5. Video Block
const VideoBlock = ({ videoId, title }) => (
  <div className="my-8">
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
        <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
        ></iframe>
    </div>
    {title && (
      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
        <Youtube size={16} className="text-red-500"/>
        <span className="italic">Video: {title}</span>
      </div>
    )}
  </div>
);

// 6. Content Renderer
const ContentRenderer = ({ content, onImageClick }) => {
  if (!content) return null;
  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        switch (block.type) {
          case 'header':
            return <h1 key={index} className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 pb-2 border-b border-slate-800 pt-10">{processText(block.text)}</h1>;
          case 'header2':
            return <h2 key={index} className="text-2xl font-semibold text-slate-100 mt-8 mb-4 flex items-center gap-2 pt-6"><ChevronRight className="text-purple-500" size={20}/> {processText(block.text)}</h2>;
          case 'text':
            return <p key={index} className="text-slate-400 leading-7 text-lg">{processText(block.text)}</p>;
          case 'code':
            return <CodeBlock key={index} code={block.code} language={block.language} />;
          case 'alert':
            return <Alert key={index} variant={block.variant} title={block.title} text={block.text} />;
          case 'image':
            return <ImageBlock key={index} src={block.src} alt={block.alt} caption={block.caption} onImageClick={onImageClick} />;
          case 'video':
            return <VideoBlock key={index} videoId={block.videoId} title={block.title} />;
          case 'list':
            return <ul key={index} className="list-disc pl-5 space-y-2 text-slate-400 marker:text-purple-500">{block.items.map((item, i) => <li key={i}>{processText(item)}</li>)}</ul>;
          default: return null;
        }
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN APP                                                                   */
/* -------------------------------------------------------------------------- */

const Navbar = ({ data, setIsSidebarOpen }) => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-[#0b0c15]/80 backdrop-blur-md border-b border-slate-800 z-50 shadow-xl">
    <div className="flex items-center justify-between h-full px-4 lg:px-6">
      <button onClick={() => setIsSidebarOpen(prev => !prev)} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-3">
        <div className="p-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
          <Book className="text-white" size={20} />
        </div>
        <h1 className="font-extrabold text-xl bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
           JoshiDocs
        </h1>
      </div>
      <a href="https://portfolio.example.com" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
        Portfolio <ArrowUpRight size={16} />
      </a>
      <div className="lg:hidden w-8" />
    </div>
  </header>
);

const Sidebar = ({ data, activeSection, isOpen, setIsOpen }) => {
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      <aside className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-[#0b0c15] border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Project Name</p>
            <h2 className="text-base font-bold text-slate-200 truncate" title={data.projectTitle}>
              {data.projectTitle}
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
              <span className="text-xs font-mono text-slate-500">
                {data.version || "Documentation"}
              </span>
            </div>
          </div>
          <nav className="space-y-8">
            {data.sections.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                  {group.category}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleScrollToSection(item.id)}
                          className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 group relative ${
                            isActive 
                              ? "bg-blue-500/10 text-blue-400 font-medium" 
                              : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                          }`}
                        >
                          {isActive && <div className="w-1 h-4 rounded-full bg-blue-500 absolute -left-1.5" />}
                          {item.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const [error, setError] = useState(null);

  const getProjectId = () => {
    const hash = window.location.hash;
    if (!hash || hash === '#/') return 'showcase'; 
    return hash.replace('#/', '');
  };

useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      const projectId = getProjectId();
      // This path assumes your JSON files are in public/data/
      const jsonUrl = `/data/${projectId}.json`; 

      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`Project "${projectId}" not found`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Failed to load docs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Listen for hash changes so the app updates when you edit the URL
    window.addEventListener('hashchange', loadData);
    
    // Initial Load
    loadData();

    return () => window.removeEventListener('hashchange', loadData);
  }, []);

  // Scroll Observer (Keeps sidebar highlighted)
  useEffect(() => {
    if (!data || loading || error) return;
    
    const allIds = data.sections.flatMap(g => g.items.map(i => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    
    allIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [data, loading, error]);

  useEffect(() => {
    if (!data) return;
    const allIds = data.sections.flatMap(g => g.items.map(i => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    allIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [data]);
  
  const handleImageClick = (imageProps) => {
    setModalImage(imageProps);
  };

if (loading) return (
    <div className="min-h-screen bg-[#0f111a] flex flex-col justify-center items-center text-slate-500 gap-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-mono text-sm">Loading Documentation...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0f111a] flex flex-col justify-center items-center text-slate-400 gap-4">
      <AlertTriangle size={48} className="text-red-500 mb-2" />
      <h2 className="text-xl font-bold text-slate-200">Documentation Not Found</h2>
      <p className="text-sm font-mono bg-slate-900 px-4 py-2 rounded border border-slate-800">
        Could not load: /data/{getProjectId()}.json
      </p>
      <div className="flex gap-4 mt-4">
        <a href="#/showcase" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Go to Showcase
        </a>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-200 font-sans selection:bg-purple-500/30">
      <Navbar data={data} setIsSidebarOpen={setSidebarOpen} />
      <Sidebar data={data} activeSection={activeSection} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="lg:pl-72 pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-8 lg:py-16">
          {data.sections.flatMap(group => 
            group.items.map((item) => (
              <section key={item.id} id={item.id} className="py-6 border-b border-slate-800 last:border-0">
                <ContentRenderer content={item.content} onImageClick={handleImageClick} />
              </section>
            ))
          )}
          <footer className="mt-20 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
            <p>© 2024 {data.projectTitle}.</p>
          </footer>
        </div>
      </main>
      
      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          caption={modalImage.caption}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
}

export default App;