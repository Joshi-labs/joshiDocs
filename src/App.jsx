import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle} from 'lucide-react';

import ImageModal from './components/ImageModal';
import ContentRenderer from './components/ContentRenderer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';



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

    window.addEventListener('hashchange', loadData);
    
    loadData();

    return () => window.removeEventListener('hashchange', loadData);
  }, []);

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
        <a href="#/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Go to Home
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