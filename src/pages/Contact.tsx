import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-page container section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="contact-header text-center"
            >
                <h1>Private Concierge</h1>
                <p className="subtitle">Initiate a dialogue regarding curation, valuation, or acquisition.</p>
            </motion.div>

            <div className="contact-grid">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="contact-info"
                >
                    <div className="info-block glass-panel">
                        <h3>Gallery Details</h3>

                        <div className="info-item">
                            <MapPin size={24} className="info-icon" />
                            <div>
                                <h4>Address</h4>
                                <p>128 Antique District, Chelsea<br />London, UK SW3</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Phone size={24} className="info-icon" />
                            <div>
                                <h4>Direct Line</h4>
                                <p>+44 20 7946 0958</p>
                                <p className="sm-text">Mon-Fri: 10am - 6pm (GMT)</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Mail size={24} className="info-icon" />
                            <div>
                                <h4>Electronic Draft</h4>
                                <p>concierge@timelessfinds.com</p>
                            </div>
                        </div>

                        <div className="whatsapp-cta">
                            <a href="https://wa.me/442079460958" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                                <MessageCircle size={20} /> Secure WhatsApp Chat
                            </a>
                            <span className="secure-text">End-to-end encrypted direct curation channel.</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="contact-form-wrapper"
                >
                    <form className="inquiry-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-header">
                            <h3>Submit an Inquiry</h3>
                            <p>For sourcing specific items not listed in the public gallery.</p>
                        </div>

                        <div className="input-group">
                            <div className="input-field">
                                <label>Salutation & Name</label>
                                <input type="text" placeholder="e.g. Dr. Thomas Wright" required />
                            </div>
                            <div className="input-field">
                                <label>Electronic Mail</label>
                                <input type="email" placeholder="email@domain.com" required />
                            </div>
                        </div>

                        <div className="input-field full-width">
                            <label>Nature of Inquiry</label>
                            <select required>
                                <option value="">Select an option</option>
                                <option value="acquisition">Acquire an Item</option>
                                <option value="sourcing">Sourcing Request</option>
                                <option value="valuation">Valuation Services</option>
                                <option value="press">Press / Media</option>
                            </select>
                        </div>

                        <div className="input-field full-width">
                            <label>Detailed Message</label>
                            <textarea rows={6} placeholder="Provide necessary specifics regarding era, provenance requirements, or budget allocation..." required></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-submit">Transmit Missive</button>
                    </form>
                </motion.div>
            </div>

            <style>{`
        .contact-page {
          padding-top: 150px;
        }
        .contact-header {
          margin-bottom: 5rem;
        }
        .contact-header h1 {
          font-size: clamp(3rem, 5vw, 4.5rem);
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .contact-header .subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
        }

        .info-block {
          padding: 3rem 2rem;
          height: 100%;
        }
        .info-block h3 {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--accent-gold);
          margin-bottom: 3rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .info-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .info-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }
        .info-item h4 {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .info-item p {
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .info-item .sm-text {
          font-size: 0.8rem;
          margin-top: 0.3rem;
          opacity: 0.7;
        }
        .whatsapp-cta {
          margin-top: 4rem;
          text-align: center;
        }
        .secure-text {
          display: block;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        .contact-form-wrapper {
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid var(--border-color);
          padding: 4rem;
        }
        .form-header {
          margin-bottom: 3rem;
        }
        .form-header h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--accent-gold);
          margin-bottom: 0.5rem;
        }
        .form-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        
        .input-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .input-field {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
        }
        .input-field.full-width {
          grid-column: 1 / -1;
        }
        .input-field label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          margin-bottom: 0.8rem;
        }
        .input-field input, .input-field select, .input-field textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 1rem;
          transition: border-color var(--trans-fast);
          outline: none;
        }
        .input-field input:focus, .input-field select:focus, .input-field textarea:focus {
          border-bottom-color: var(--accent-gold);
        }
        .input-field select {
          cursor: pointer;
        }
        .input-field select option {
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        .input-field textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .btn-submit {
          width: 100%;
          padding: 1.5rem;
          margin-top: 2rem;
          font-size: 1rem;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .input-group {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .contact-form-wrapper {
            padding: 3rem 2rem;
          }
        }
      `}</style>
        </div>
    );
};

export default Contact;
