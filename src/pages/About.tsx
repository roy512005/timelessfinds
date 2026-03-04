import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="hero-bg">
                    <img src="https://images.unsplash.com/photo-1542840410-3092f99611a3?auto=format&fit=crop&q=80" alt="Antique Archive" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="container hero-content text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="about-title"
                    >
                        The Custodians of Epochs
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="scroll-indicator"
                    >
                        <p>Our Philosophy</p>
                        <div className="line"></div>
                    </motion.div>
                </div>
            </div>

            <section className="section story-section container">
                <div className="story-layout">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="story-text"
                    >
                        <h2>Beyond the Artifact</h2>
                        <p className="lead-text">We do not deal in objects; we trade in whispered histories and frozen moments of time.</p>
                        <p>Every piece at Timeless Finds has ostensibly lived a life much longer and broader than our own. We act as temporary custodians, preserving the cultural resonance of centuries past. When you acquire from our gallery, you're not decorating a room; you are continuing a legacy.</p>
                        <p>Our team of historians and appraisers traverse the globe, from the forgotten attics of Parisian aristocrats to the closed archives of mid-century industrial designers, seeking objects that vibrate with undeniable narrative weight.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="story-image"
                    >
                        <img src="https://images.unsplash.com/photo-1627993077651-6df79ab4e9a0?auto=format&fit=crop&q=80" alt="Curator inspecting artifact" />
                    </motion.div>
                </div>
            </section>

            <section className="section philosophy-section">
                <div className="container text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        The Founder's Vision
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="quote-block"
                    >
                        <blockquote>
                            "In an era of mass reproduction and disposable aesthetics, an object carrying the patina of true time becomes an anchor for the soul. It reminds us that quality endures, and beauty outlives its creator."
                        </blockquote>
                        <span className="founder-name">Elias Thorne, Chief Curator</span>
                    </motion.div>
                </div>
            </section>

            <style>{`
        .about-page {
          padding-top: 0;
        }
        .about-hero {
          position: relative;
          height: 80vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -80px; 
          border-bottom: 1px solid var(--border-color);
        }
        .about-hero .hero-bg, .about-hero .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
        }
        .about-hero .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(30%) sepia(20%);
        }
        .about-hero .hero-overlay {
          background: linear-gradient(0deg, var(--bg-primary) 0%, rgba(10,10,10,0.6) 100%);
        }
        .about-title {
          font-size: clamp(3rem, 5vw, 5rem);
          color: var(--accent-gold);
          letter-spacing: 2px;
          margin-bottom: 4rem;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .scroll-indicator p {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--text-secondary);
        }
        .scroll-indicator .line {
          width: 1px;
          height: 60px;
          background: linear-gradient(180deg, var(--accent-gold) 0%, transparent 100%);
        }

        .story-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
          padding: 4rem 0;
        }
        .story-text h2 {
          font-size: 3rem;
          margin-bottom: 2rem;
          color: var(--accent-gold);
        }
        .lead-text {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-style: italic;
          color: var(--text-primary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .story-text p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        .story-image {
          position: relative;
          aspect-ratio: 3/4;
        }
        .story-image::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          width: 100%;
          height: 100%;
          border: 1px solid var(--accent-gold);
          z-index: 0;
        }
        .story-image img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .philosophy-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .philosophy-section h2 {
          font-size: 2.5rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 4rem;
        }
        .quote-block {
          max-width: 800px;
          margin: 0 auto;
        }
        .quote-block blockquote {
          font-family: var(--font-serif);
          font-size: 2rem;
          line-height: 1.5;
          color: var(--accent-gold);
          margin-bottom: 2rem;
          position: relative;
        }
        .quote-block blockquote::before {
          content: '"';
          font-size: 6rem;
          position: absolute;
          top: -40px;
          left: -40px;
          color: rgba(200, 169, 126, 0.1);
          font-family: var(--font-serif);
        }
        .founder-name {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--text-secondary);
        }

        @media (max-width: 968px) {
          .story-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .quote-block blockquote {
            font-size: 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default About;
