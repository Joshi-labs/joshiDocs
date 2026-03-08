import React from "react";
import { Menu, Book, ArrowUpRight } from "lucide-react";

const Navbar = ({ data, setIsSidebarOpen }) => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-[#0b0c15]/80 backdrop-blur-md border-b border-slate-800 z-50 shadow-xl">
    <div className="flex items-center justify-between h-full px-4 lg:px-6">
      <button onClick={() => setIsSidebarOpen(prev => !prev)} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
        {
        //<Menu size={24} />
        }
      </button>
      <div className="flex items-center gap-3">
        <div className="p-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
          <Book className="text-white" size={20} />
        </div>
        <h1 className="font-extrabold text-xl bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
           JoshiDocs
        </h1>
      </div>
      <a href="https://vpjoshi.in" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
        Portfolio <ArrowUpRight size={16} />
      </a>
      <div className="lg:hidden w-8" />
    </div>
  </header>
);

export default Navbar;