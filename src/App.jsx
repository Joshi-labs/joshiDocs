import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import DocsViewer from './pages/DocsViewer';
import ImageModal from './components/ImageModal';
import Navbar from './components/Navbar'; // We might need a generic navbar for Home page too eventually

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [modalImage, setModalImage] = useState(null);

  // Router Logic
  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Determine Page
  // Doc routes start with '#/' followed by the project id (e.g. '#/ott', '#/vpc_threat_lens').
  // Empty, '#', '#/', or anchor hashes like '#core', '#aiml' remain on Home.
  const isDoc = Boolean(currentHash && currentHash.startsWith('#/') && currentHash.length > 2);
  const isHome = !isDoc;
  const projectId = isDoc ? currentHash.slice(2).split('?')[0].split('#')[0] : null;

  return (
    <>
      {/* 1. Page Routing */}
      {isHome ? (
        <Home />
      ) : (
        <DocsViewer 
          projectId={projectId} 
          onImageClick={setModalImage} 
        />
      )}

      {/* 2. Global Image Modal (Available on all pages) */}
      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          caption={modalImage.caption}
          onClose={() => setModalImage(null)}
        />
      )}
    </>
  );
}

export default App;