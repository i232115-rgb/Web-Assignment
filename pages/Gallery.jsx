// src/pages/Gallery.jsx
import { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import CircleLogo from '../components/CircleLogo';
import galleryData from '../data/galleryData.json';
import styles from './Gallery.module.css';

// Import the local video
const travelVideo = '/assets/videotoadd.mp4';

export default function Gallery() {
  const [clickCounts, setClickCounts] = useState(() => {
    const saved = localStorage.getItem('galleryClicks');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('galleryClicks', JSON.stringify(clickCounts));
  }, [clickCounts]);

  const handleImageClick = (index) => {
    setClickCounts(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
  };

  return (
    <>
      <Header />

      <section className={styles.pageHeader}>
        <h1>Travel Gallery 📸✨</h1>
        <p>Explore the beauty of the world — with a touch of security awareness.</p>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.overlay} />

        <div className={styles.grid}>
          {galleryData.map((item, i) => (
            <div key={i} className={styles.card}>
              <img
                src={item.src}
                alt={item.caption}
                className={styles.cardImage}
                onClick={() => handleImageClick(i)}
              />

              {clickCounts[i] > 0 && (
                <div className={styles.clickBadge}>
                  ❤️ {clickCounts[i]} {clickCounts[i] === 1 ? 'click' : 'clicks'}
                </div>
              )}

              <div className={styles.caption}>
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL VIDEO from src/assets */}
      <section className={styles.videoSection}>
        <h2 className={styles.videoTitle}>
          Travel Safety Tips Video 🎥
        </h2>
        <div className={styles.videoContainer}>
          <video
            controls
            className={styles.videoIframe}
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"  // optional thumbnail
          >
            <source src={travelVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className={styles.videoCaption}>
          Watch this quick guide on staying secure while traveling the world! 🔒✈️
        </p>
      </section>

      <CircleLogo />
      <Footer />
    </>
  );
}