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
  // If hash is empty, #, or #/, we are Home. Otherwise, we are viewing a doc.
  const isHome = !currentHash || currentHash === '#/' || currentHash === '#';
  const projectId = isHome ? null : currentHash.replace('#/', '');

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