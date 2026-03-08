import React from 'react';
import { Cloud, Code, Cpu, ExternalLink, Github, BookOpen, Layers, Activity } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const getIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'cloud': return <Cloud size={14} className="text-blue-400" />;
      case 'ai': case 'ml': return <Cpu size={14} className="text-purple-400" />;
      case 'iot': return <Activity size={14} className="text-green-400" />;
      case 'web3': return <Layers size={14} className="text-pink-400" />;
      default: return <Code size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="group relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-500">
      
      {/* 1. Category Badge (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
        {getIcon(project.category)}
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{project.category}</span>
      </div>

      {/* 2. Image (Background) */}
      <img 
        src={project.thumbnail} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-80 group-hover:opacity-40"
      />

      {/* 3. Content Overlay (Always visible at bottom, moves up on hover) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
        
        {/* Title & Desc - Moves up when hovered */}
        <div className="transform translate-y-16 group-hover:translate-y-[-20px] transition-transform duration-500">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{project.title}</h3>
          <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 max-w-[200px] mx-auto">
            {project.description}
          </p>
        </div>

        {/* 4. Circular Buttons (Scale up on hover) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 pb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          
          <a href={project.links.docs} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 transition-all hover:scale-110" title="Documentation">
            <BookOpen size={20} />
          </a>
          
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 shadow-lg transition-all hover:scale-110" title="GitHub Code">
              <Github size={20} />
            </a>
          )}

          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 transition-all hover:scale-110" title="Live Demo">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;