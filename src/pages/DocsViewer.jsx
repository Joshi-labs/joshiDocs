import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ContentRenderer from '../components/ContentRenderer';

const DocsViewer = ({ projectId, onImageClick }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // 1. Fetch Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      const jsonUrl = `/data/${projectId}.json`;

      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error("Project not found");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [projectId]);

  // 2. Scroll Spy
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

  if (loading) return <div className="min-h-screen bg-[#0f111a] flex justify-center items-center text-slate-500">Loading...</div>;

  if (error) return (
    <div className="min-h-screen bg-[#0f111a] flex flex-col justify-center items-center text-slate-400 gap-4">
      <AlertTriangle size={48} className="text-red-500" />
      <h2 className="text-xl font-bold text-slate-200">Doc Not Found</h2>
      <a href="#/" className="px-4 py-2 bg-blue-600 rounded text-white">Go Home</a>
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
                <ContentRenderer content={item.content} onImageClick={onImageClick} />
              </section>
            ))
          )}
           <footer className="mt-20 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
            <p>© 2024 {data.projectTitle}.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default DocsViewer;