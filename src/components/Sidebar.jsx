import React from "react";


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

export default Sidebar;