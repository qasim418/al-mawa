import React, { useState } from 'react';
import SiteLayout from '../components/SiteLayout';

// Image configurations with their actual extensions
const imageConfigs = [
  { id: 1, ext: 'png' },
  { id: 2, ext: 'png' },
  { id: 3, ext: 'jpg' },
  { id: 4, ext: 'jpg' },
  { id: 5, ext: 'jpg' },
  { id: 6, ext: 'jpg' },
  { id: 7, ext: 'jpg' },
  { id: 8, ext: 'jpg' },
  { id: 9, ext: 'jpg' },
  { id: 10, ext: 'jpg' },
  { id: 11, ext: 'png' },
  { id: 12, ext: 'jpg' },
  { id: 13, ext: 'jpg' },
  { id: 14, ext: 'jpg' },
  { id: 15, ext: 'png' },
  { id: 16, ext: 'png' },
];

const getImagePath = (num, ext) => {
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}/fundraiseimages/Picture${num}.${ext}`;
};

const images = imageConfigs.map(cfg => ({
  id: cfg.id,
  src: getImagePath(cfg.id, cfg.ext),
  alt: `Masjid Annoor - Photo ${cfg.id}`
}));

export default function ConstructionGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);
  const goToPrev = (e) => {
    e.stopPropagation();
    if (selectedImage) {
      const newId = selectedImage.id === 1 ? 16 : selectedImage.id - 1;
      setSelectedImage(images[newId - 1]);
    }
  };
  const goToNext = (e) => {
    e.stopPropagation();
    if (selectedImage) {
      const newId = selectedImage.id === 16 ? 1 : selectedImage.id + 1;
      setSelectedImage(images[newId - 1]);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev(e);
      if (e.key === 'ArrowRight') goToNext(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Gallery</h1>
          <p className="sub">Current photos of Masjid Annoor before construction begins.</p>

          {/* Masonry-style Image Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16
          }}>
            {images.map((img, index) => (
              <div
                key={img.id}
                onClick={() => openLightbox(img)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  background: '#f0f0f0',
                  position: 'relative',
                  // Make some images span 2 rows for masonry effect
                  gridRow: (index % 5 === 0 || index % 7 === 0) ? 'span 2' : 'span 1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: (index % 5 === 0 || index % 7 === 0) ? 400 : 200,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(15, 81, 50, 0)',
                  transition: 'background 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 81, 50, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 81, 50, 0)';
                }}
                >
                  <span style={{
                    color: '#fff',
                    fontSize: 40,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                  >
                    🔍
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: 24,
              width: 44,
              height: 44,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>

          {/* Prev button */}
          <button
            onClick={goToPrev}
            style={{
              position: 'absolute',
              left: 20,
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              width: 50,
              height: 50,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: 20,
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              width: 50,
              height: 50,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              backdropFilter: 'blur(4px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ›
          </button>

          {/* Image */}
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: 8,
              boxShadow: '0 25px 80px rgba(0,0,0,0.6)'
            }}
          />

          {/* Image counter dots */}
          <div style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
            padding: '10px 16px',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: 20,
            backdropFilter: 'blur(4px)'
          }}>
            {images.map((img) => (
              <button
                key={img.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                }}
                style={{
                  width: selectedImage.id === img.id ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  background: selectedImage.id === img.id ? '#d4af37' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
