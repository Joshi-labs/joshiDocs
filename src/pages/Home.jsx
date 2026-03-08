import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import Navbar from '../components/Navbar';

const Home = () => {
  const [data, setData] = useState({ featured: [], hackathon: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleScrollClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Base Background: Neutral Dark Gray (Slate-950)
    <div className="relative min-h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
        <Navbar data={{ projectTitle: "JoshiDocs", version: "" }} setIsSidebarOpen={() => {}} />
      
      {/* --- PROFESSIONAL BACKGROUND LAYERS --- */}
      {/* 1. Subtle Dot Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
      
      {/* 2. Vignette (Darkens edges to focus on content) */}
      <div className="absolute inset-0 bg-vignette pointer-events-none"></div>

      {/* 3. Top Glow (Subtle Blue Ambient Light) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-40 mb-20">
          
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Available for Summer 2026 Internships
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            VP Joshi
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Cloud Engineer & Full Stack Developer. <br />
            Specializing in <span className="text-slate-200 font-medium">Distributed Systems</span> and <span className="text-slate-200 font-medium">Scalable Architecture</span>.
          </p>
          
          <div className="flex gap-4 mb-16">
            <a href="#featured" onClick={handleScrollClick} className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-slate-200 transition-colors">
              View Work
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white font-medium hover:bg-slate-800 transition-colors">
              GitHub
            </a>
          </div>
        </section>

        {/* SECTION 1: FEATURED PROJECTS */}
        <section id="featured" className="max-w-7xl mx-auto px-6 py-20">
          <FadeInSection>
            <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-semibold text-white">Featured Projects</h2>
              <span className="text-sm text-slate-500 hidden md:block">Architecture & Engineering</span>
            </div>
          </FadeInSection>
          
          {loading ? (
             <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featured.map((proj, index) => (
                <FadeInSection key={proj.id} delay={index * 100}>
                   <ProjectCard project={proj} />
                </FadeInSection>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2: HACKATHON */}
        <section className="max-w-7xl mx-auto px-6 py-20 pb-32">
          <FadeInSection>
            <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-semibold text-white">Hackathon & Experiments</h2>
              <span className="text-sm text-slate-500 hidden md:block">Rapid Prototyping</span>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.hackathon?.map((proj, index) => (
               <FadeInSection key={proj.id} delay={index * 100}>
                 <ProjectCard project={proj} />
               </FadeInSection>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <FadeInSection>
          <footer className="border-t border-slate-900 bg-[#020617] py-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-6">Let's Connect</h3>
              <div className="flex justify-center gap-6 mb-8">
                <SocialLink href="#" icon={<Github size={20} />} />
                <SocialLink href="#" icon={<Linkedin size={20} />} />
                <SocialLink href="#" icon={<Twitter size={20} />} />
                <SocialLink href="mailto:hello@vpjoshi.in" icon={<Mail size={20} />} />
              </div>
              <p className="text-slate-600 text-sm">
                © 2024 VP Joshi. <br />
              </p>
            </div>
          </footer>
        </FadeInSection>

      </div>
    </div>
  );
};

// Simplified Social Link for Professional Look
const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
  >
    {icon}
  </a>
);

export default Home;