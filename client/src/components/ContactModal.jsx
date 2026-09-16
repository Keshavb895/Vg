import React, { useState } from 'react';
import { X, CheckCircle2, Send, MessageCircle, Lock, Sparkles } from 'lucide-react';

export function ContactModal({ isOpen, onClose }) {
  const [inquiryType, setInquiryType] = useState('P2P Services');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('http://localhost:5000/api/p2p/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          type: inquiryType,
          notes: message
        })
      });
    } catch {
      console.log('Backend simulated response');
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setMessage('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.6rem', color: '#0f172a' }}>
              Message Received!
            </h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Thank you, <strong>{name || 'Friend'}</strong>. Vaibhav Gupta&apos;s team will review your inquiry 
              regarding <strong>{inquiryType}</strong> and reach out to you at <strong>{contact}</strong> shortly.
            </p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleReset}>
              Close
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <Sparkles size={22} color="#2563eb" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>Get in Touch with Vaibhav</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Have questions about our P2P services, partnerships, or community guidance? Reach out below.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Inquiry Type selection */}
              <div className="form-group">
                <label className="form-label">Service / Topic</label>
                <select
                  className="form-select"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                >
                  <option value="P2P Services">P2P Services &amp; Facilitation</option>
                  <option value="VIP High Volume P2P">VIP &amp; High Volume P2P Inquiry</option>
                  <option value="Escrow Advisory">Zero-Freeze Escrow Advisory</option>
                  <option value="Community & Collaboration">Community &amp; Collaboration</option>
                </select>
              </div>

              {/* Name input */}
              <div className="form-group">
                <label className="form-label">Your Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              {/* Telegram or WhatsApp Contact */}
              <div className="form-group">
                <label className="form-label">Telegram Handle or WhatsApp Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@your_telegram or +91 9876543210"
                  required
                />
              </div>

              {/* Message text */}
              <div className="form-group">
                <label className="form-label">Message / Details (Optional)</label>
                <textarea
                  className="form-input"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're looking for or your questions regarding our P2P services..."
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b', marginBottom: '1.25rem' }}>
                <Lock size={12} />
                <span>Your contact details are strictly confidential and will never be shared.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                {loading ? 'Submitting...' : (
                  <>
                    <Send size={16} />
                    <span>Send Message to Vaibhav&apos;s Team</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
