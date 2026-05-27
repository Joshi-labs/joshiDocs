import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, FileText, Terminal, Cpu } from 'lucide-react';

// ==========================================
// 1. PROJECT DATA
// ==========================================
const PROJECTS = [
  { id: 'ott', title: 'Joshi OTT', description: 'A Netflix-style OTT platform with adaptive HLS streaming, serverless AWS Lambda auth, and DynamoDB.', badge: 'core' },
  { id: 'server', title: 'Self Hosted Server', description: 'Self-hosted k3s homelab running LLaMA 3.2, n8n, Postgres, and Grafana — saving ₹10,000/month.', badge: 'core' },
  { id: 'orbit', title: 'Container Orchestrator', description: 'Lightweight container orchestrator built from scratch in Go — distribute Docker containers without K8s.', badge: 'core' },
  { id: 'sync-docs', title: 'Doc Collab Tool', description: 'Real-time collaborative docs, built for scale on AWS.', badge: 'core' },
  { id: 's3-drive', title: 'S3 Drive', description: 'A self-hosted Google Drive alternative built on AWS S3 and Go.', badge: 'core' },
  { id: 'os', title: 'Custom OS', description: 'Custom Linux OS for electric vehicles, built on Arch with a React GUI.', badge: 'core' },

  { id: 'aws', title: 'AWS Infrastructure', description: 'Production AWS architectures across EKS, Lambda, MSK, SES, CloudFront, and EC2 — spanning multiple real projects.', badge: 'devops' },
  { id: 'cicd', title: 'CI/CD Pipelines', description: 'GitHub Actions CI/CD pipeline deploying to a self-hosted k3s cluster — build, push to GHCR, and rolling deploy on [prod] commits.', badge: 'devops' },
  { id: 'cloudflare', title: 'Cloudflare Tunnels', description: 'Zero-trust homelab ingress — 12 services across 3 domains, no open ports, automatic TLS, 350ms latency.', badge: 'devops' },
  { id: 'monitoring', title: 'Monitoring Tool / Stack', description: 'Self-hosted Grafana + Prometheus observability stack: monitoring CPU, RAM, power draw, and network with a public dashboard.', badge: 'devops' },
  
  { id: 'hackathon1', title: 'AI Ticketing System', description: 'A low cost ticketing system that uses multilingual AI to generate tickets and manage them.', badge: 'hackathon' },
  { id: 'hackathon2', title: 'Dark Web Surveillance Tool', description: 'A tool that uses AI to detect and monitor dark web activities. It costs nothing to run.', badge: 'hackathon' },
  { id: 'hackathon3', title: 'Legal AI Assistant', description: 'Fine-tuned chatbot for Dept. of Justice · Built at SIH 2024', badge: 'hackathon' }
];

const WhatsappIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

// ==========================================
// 2. COMPONENTS
// ==========================================
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ProjectListItem = ({ project }) => {
  const getBadgeStyle = (badge) => {
    switch(badge) {
      case 'core': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'devops': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'hackathon': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getIcon = (badge) => {
    switch(badge) {
      case 'core': return <Cpu size={20} />;
      case 'devops': return <Terminal size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <a 
      href={`#/${project.id}`} 
      // Added h-full and changed sm:items-center to sm:items-start so the icon stays at the top
      className="group flex flex-col sm:flex-row sm:items-start gap-4 p-6 bg-slate-900/40 border border-slate-800 rounded-xl hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-300 h-full"
    >
      {/* Icon Box */}
      <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-12 h-12 mt-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors">
        {getIcon(project.badge)}
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          {/* Removed truncate so title can wrap if needed */}
          <h3 className="text-base font-semibold text-slate-100 group-hover:text-white leading-snug">
            {project.title}
          </h3>
          <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border rounded-md ${getBadgeStyle(project.badge)}`}>
            {project.badge}
          </span>
        </div>
        {/* Removed truncate and added leading-relaxed for better readability on long text */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Arrow Indicator */}
      <div className="hidden sm:flex flex-shrink-0 items-center self-center text-slate-600 group-hover:text-blue-400 transition-colors group-hover:translate-x-1 duration-300">
        <ArrowRight size={20} />
      </div>
    </a>
  );
};

// ==========================================
// 3. MAIN PAGE
// ==========================================
const Home = () => {
  const coreProjects = PROJECTS.filter(p => p.badge === 'core');
  const devopsProjects = PROJECTS.filter(p => p.badge === 'devops');
  const hackathonProjects = PROJECTS.filter(p => p.badge === 'hackathon');

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const ProjectSection = ({ id, title, projects }) => (
    <section id={id} className="max-w-5xl mx-auto px-6 py-12">
      <FadeInSection>
        <div className="mb-6 border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
      </FadeInSection>
      
      {/* Grid items will automatically stretch to the tallest item in the row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {projects.map((proj, index) => (
          <FadeInSection key={proj.id} delay={(index % 4) * 50} className="h-full">
             <ProjectListItem project={proj} />
          </FadeInSection>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-bold tracking-tight flex items-center gap-3">
            {/* Favicon inserted here */}
            <img src="/favicon.png" alt="Logo" className="w-6 h-6 object-contain rounded-sm" />
            JoshiDocs
          </span>
          <a 
            href="https://vpjoshi.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
          >
            Portfolio <ExternalLink size={14} />
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pb-20">
        {/* Hero */}
        <section className="px-6 max-w-4xl mx-auto pt-24 pb-12 text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Project Documentation
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Internal wiki and technical documentation for architecture, distributed systems, and rapid prototyping.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#core" onClick={(e) => scrollToSection(e, 'core')} className="px-5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-medium text-slate-300 transition-colors">Core Systems</a>
              <a href="#devops" onClick={(e) => scrollToSection(e, 'devops')} className="px-5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-medium text-slate-300 transition-colors">DevOps</a>
              <a href="#hackathon" onClick={(e) => scrollToSection(e, 'hackathon')} className="px-5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-medium text-slate-300 transition-colors">Hackathons</a>
            </div>
          </FadeInSection>
        </section>

        {/* Project Sections */}
        <ProjectSection id="core" title="Core Engineering" projects={coreProjects} />
        <ProjectSection id="devops" title="DevOps & Infrastructure" projects={devopsProjects} />
        <ProjectSection id="hackathon" title="Hackathons & Prototyping" projects={hackathonProjects} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} VP Joshi. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/Joshi-labs" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors" title="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@vpjoshi.in" className="text-slate-500 hover:text-emerald-400 transition-colors" title="Email">
              <Mail size={20} />
            </a>
            <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-500 transition-colors" title="WhatsApp">
              <WhatsappIcon size={20} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;