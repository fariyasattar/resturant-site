import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// Reservation.jsx me
const API_URL = import.meta.env.VITE_API_URL || 'https://resturant-site-production.up.railway.app';



const servicesData = [
  {
    id: "01",
    title: "Royal Dine-In",
    tagline: "Where Old Lahore Breathes",
    desc: "Traditional takht seating with clay pot specialties. Live Qawwali every Friday night creates an authentic old Lahore atmosphere you cannot replicate anywhere else.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=90",
    meta: "120 Guests",
    setup: "Takht Setup",
    accent: "#FFB400",
    highlight: "Live Qawwali — Every Friday",
  },
  {
    id: "02",
    title: "Express Delivery",
    tagline: "Sizzling. At Your Door.",
    desc: "45-minute hot delivery across DHA, Gulberg & Model Town. Premium thermal insulation keeps your karahi bubbling and naan warm the moment it arrives.",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=90",
    meta: "Free Above Rs. 2000",
    setup: "DHA · Gulberg · Model Town",
    accent: "#FF6B35",
    highlight: "Guaranteed in 45 Minutes",
  },
  {
    id: "03",
    title: "Live BBQ Station",
    tagline: "Fire. Smoke. Theatre.",
    desc: "Our master grill chef arrives at your venue with a full seekh kebab & tandoor naan live station. The sizzle, the smoke, the spectacle — an experience, not just a meal.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=90",
    meta: "Chef + Full Setup",
    setup: "Mobile Catering Unit",
    accent: "#E63946",
    highlight: "Live Fire at Your Venue",
  },
  {
    id: "04",
    title: "Event Catering",
    tagline: "Dastarkhan for Thousands",
    desc: "Complete Dastarkhan from 50 to 5000 guests. Fully custom menus curated for weddings, corporate gatherings, and private celebrations. We handle every plate.",
    img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1200&q=90",
    meta: "50–5000 Guests",
    setup: "Menu Design Included",
    accent: "#2EC4B6",
    highlight: "Custom Menu Planning",
  },
];

const bookingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().regex(/^\d{11}$/, 'Phone must be exactly 11 digits'),
  guests: z.string().min(1, 'Please enter number of guests').refine(val => parseInt(val) > 0, 'Must be at least 1 guest'),
  date: z.string().min(1, 'Please select a date').refine(val => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return new Date(val) >= today;
  }, 'Cannot select a past date'),
});

const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const dateInputRef = useRef(null);
  const activeService = servicesData[activeIdx];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: '', phone: '', guests: '', date: '' },
  });

  const handleServiceChange = (idx) => {
    if (idx === activeIdx) return;
    setPrevIdx(activeIdx);
    setImgLoaded(false);
    setActiveIdx(idx);
  };

  useEffect(() => {
    const img = new Image();
    img.src = activeService.img;
    img.onload = () => setImgLoaded(true);
  }, [activeIdx]);

 

const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/bookings`, {
        service: activeService.title,
        serviceId: activeService.id,
        ...data,
      });
      toast.success('Booking confirmed! We will contact you shortly.');
      reset();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .services-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .services-root {
          font-family: 'DM Sans', sans-serif;
          background: #0A0A0A;
          color: #fff;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* ── TOP STRIP ── */
        .top-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          z-index: 10;
          position: relative;
        }
        .top-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #FFB400;
        }
        .top-nav {
          display: flex;
          gap: 32px;
        }
        .top-nav a {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .top-nav a:hover { color: #fff; }

        /* ── MAIN LAYOUT ── */
        .main-layout {
          flex: 1;
          display: flex;
          overflow: hidden;
          min-height: 0;
        }

        /* ── LEFT PANEL ── */
        .left-panel {
          width: 420px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.06);
          z-index: 5;
          position: relative;
          background: #0A0A0A;
        }

        .panel-header {
          padding: 36px 40px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .panel-eyebrow {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 12px;
        }
        .panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 300;
          line-height: 1.05;
          color: #fff;
        }
        .panel-title em {
          font-style: italic;
          color: #FFB400;
        }

        /* ── SERVICE LIST ── */
        .service-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
          scrollbar-width: none;
        }
        .service-list::-webkit-scrollbar { display: none; }

        .service-item {
          position: relative;
          padding: 20px 40px;
          cursor: pointer;
          transition: background 0.25s;
          border-left: 2px solid transparent;
          overflow: hidden;
        }
        .service-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,180,0,0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .service-item.active { border-left-color: var(--accent); }
        .service-item.active::before { opacity: 1; }
        .service-item:not(.active):hover { background: rgba(255,255,255,0.03); }

        .service-num {
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.2);
          margin-bottom: 4px;
          transition: color 0.3s;
        }
        .service-item.active .service-num { color: var(--accent); }

        .service-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          transition: color 0.3s;
          line-height: 1.2;
        }
        .service-item.active .service-name { color: #fff; }
        .service-item:not(.active):hover .service-name { color: rgba(255,255,255,0.7); }

        .service-tagline {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.2);
          margin-top: 3px;
          font-style: italic;
          transition: color 0.3s;
        }
        .service-item.active .service-tagline { color: rgba(255,255,255,0.45); }

        .service-arrow {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          opacity: 0;
          font-size: 14px;
          color: var(--accent);
          transition: all 0.3s;
        }
        .service-item.active .service-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        .service-divider {
          height: 1px;
          background: rgba(255,255,255,0.04);
          margin: 0 40px;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        /* BG Image */
        .bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.8s ease, transform 1.2s ease;
          transform: scale(1.04);
        }
        .bg-image.loaded { transform: scale(1); }
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10,10,10,0.85) 0%,
            rgba(10,10,10,0.5) 40%,
            rgba(10,10,10,0.2) 70%,
            rgba(10,10,10,0.6) 100%
          );
        }
        .bg-noise {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── CONTENT AREA ── */
        .content-area {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 60px 52px;
          z-index: 2;
        }

        .content-highlight {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .highlight-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .highlight-text {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 400;
        }

        .content-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 300;
          line-height: 1;
          color: #fff;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .content-title em { font-style: italic; }

        .content-desc {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          max-width: 480px;
          margin-bottom: 32px;
        }

        .content-meta {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 36px;
        }
        .meta-pill {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.05em;
        }
        .meta-pill.accent-pill {
          background: rgba(255,180,0,0.08);
          border-color: rgba(255,180,0,0.2);
          color: #FFB400;
        }

        /* ── BOOK BUTTON ── */
        .book-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 14px 32px;
          border-radius: 100px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: #fff;
          text-transform: uppercase;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .book-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .book-btn:hover::before { transform: translateX(0); }
        .book-btn:hover { color: #000; border-color: var(--accent); }
        .book-btn span { position: relative; z-index: 1; }
        .book-btn .btn-arrow {
          position: relative;
          z-index: 1;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          transition: border-color 0.3s;
        }
        .book-btn:hover .btn-arrow { border-color: rgba(0,0,0,0.3); }

        /* ── DECORATIVE INDEX ── */
        .service-index {
          position: absolute;
          top: 48px;
          right: 60px;
          z-index: 3;
          text-align: right;
        }
        .index-current {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          font-weight: 300;
          line-height: 1;
          color: rgba(255,255,255,0.06);
          letter-spacing: -0.02em;
        }
        .index-total {
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.1em;
          margin-top: -12px;
        }

        /* ── VERTICAL TEXT ── */
        .vertical-label {
          position: absolute;
          left: 20px;
          bottom: 160px;
          z-index: 3;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.12);
          font-weight: 300;
        }

        /* ── SCROLL INDICATOR ── */
        .scroll-indicator {
          position: absolute;
          bottom: 52px;
          right: 60px;
          z-index: 3;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .scroll-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: all 0.3s;
          cursor: pointer;
        }
        .scroll-dot.active {
          background: var(--accent);
          width: 20px;
          border-radius: 2px;
        }

        /* ── MODAL ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5,5,5,0.92);
          backdrop-filter: blur(12px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 48px;
          max-width: 460px;
          width: 100%;
          position: relative;
          animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: rgba(255,255,255,0.5);
          transition: all 0.2s;
          line-height: 1;
        }
        .modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .modal-close:disabled { opacity: 0.4; cursor: not-allowed; }

        .modal-service-tag {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(255,180,0,0.08);
          border: 1px solid rgba(255,180,0,0.2);
          color: #FFB400;
          margin-bottom: 20px;
        }

        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 32px;
        }
        .modal-title em { font-style: italic; color: var(--accent); }

        .field-group {
          margin-bottom: 16px;
        }
        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus {
          border-color: rgba(255,180,0,0.4);
          background: rgba(255,180,0,0.03);
        }
        .field-input.error { border-color: rgba(231,57,70,0.5); }
        .field-input:disabled { opacity: 0.4; cursor: not-allowed; }
        .field-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4);
          cursor: pointer;
        }
        .field-error {
          font-size: 11px;
          color: #E63946;
          margin-top: 6px;
          padding-left: 2px;
          letter-spacing: 0.02em;
        }

        .submit-btn {
          width: 100%;
          background: var(--accent);
          border: none;
          border-radius: 10px;
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #000;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive */
        @media (max-width: 900px) {
          .left-panel { width: 340px; }
          .panel-title { font-size: 32px; }
          .content-area { padding: 0 40px 40px; }
          .content-title { font-size: 44px; }
        }
        @media (max-width: 680px) {
          .main-layout { flex-direction: column; }
          .left-panel { width: 100%; height: 45%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .right-panel { flex: 1; }
          .top-nav { display: none; }
          .vertical-label { display: none; }
          .panel-header { padding: 20px 24px 16px; }
          .service-item { padding: 14px 24px; }
          .service-divider { margin: 0 24px; }
          .content-area { padding: 0 24px 28px; }
          .content-title { font-size: 36px; }
          .service-index { top: 24px; right: 24px; }
          .index-current { font-size: 56px; }
          .modal-card { padding: 32px 24px; }
          .modal-title { font-size: 28px; }
        }
      `}</style>

      <Toaster position="top-center" toastOptions={{
        style: { background: '#1a1a1a', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' }
      }} />

     <div
  className="services-root"
  style={{ '--accent': activeService.accent }}
>
  {/* MAIN */}
  <div className="main-layout">

    {/* LEFT */}
    <div className="left-panel">
      <div className="panel-header">
        <div className="panel-eyebrow">Our Services</div>
        <h2 className="panel-title">
          The<br />
          <em>Dastarkhan</em><br />
          Experience
        </h2>
      </div>
      <div className="service-list">
        {servicesData.map((s, i) => (
          <React.Fragment key={s.id}>
            <div
              className={`service-item${activeIdx === i ? ' active' : ''}`}
              style={{ '--accent': s.accent }}
              onClick={() => handleServiceChange(i)}
            >
              <div className="service-num">{s.id}</div>
              <div className="service-name">{s.title}</div>
              <div className="service-tagline">{s.tagline}</div>
              <div className="service-arrow">→</div>
            </div>
            {i < servicesData.length - 1 && <div className="service-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* RIGHT */}
    <div className="right-panel">
      <div
        className={`bg-image${imgLoaded ? ' loaded' : ''}`}
        style={{ backgroundImage: `url(${activeService.img})`, opacity: imgLoaded ? 0.45 : 0.3 }}
      />
      <div className="bg-overlay" />
      <div className="bg-noise" />

      <div className="service-index">
        <div className="index-current">{String(activeIdx + 1).padStart(2, '0')}</div>
        <div className="index-total">/ {String(servicesData.length).padStart(2, '0')}</div>
      </div>

      <div className="vertical-label">Lahore · Pakistan · Est. 1987</div>

      <div className="content-area">
        <div className="content-highlight">
          <div className="highlight-dot" />
          <div className="highlight-text">{activeService.highlight}</div>
        </div>

        <h3 className="content-title">
          {activeService.title.split(' ').map((word, i) =>
            i === activeService.title.split(' ').length - 1
              ? <em key={i}>{word}</em>
              : <React.Fragment key={i}>{word} </React.Fragment>
          )}
        </h3>

        <p className="content-desc">{activeService.desc}</p>

        <div className="content-meta">
          <div className="meta-pill">{activeService.meta}</div>
          <div className="meta-pill">{activeService.setup}</div>
        </div>

        <button className="book-btn" onClick={() => { setShowModal(true); reset(); }}>
          <span>Book This Service</span>
          <div className="btn-arrow">↗</div>
        </button>
      </div>

      <div className="scroll-indicator">
        {servicesData.map((_, i) => (
          <div
            key={i}
            className={`scroll-dot${activeIdx === i ? ' active' : ''}`}
            onClick={() => handleServiceChange(i)}
          />
        ))}
      </div>
    </div>
  </div>

  {/* MODAL */}
  {showModal && (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget && !isSubmitting) setShowModal(false); }}>
      <div className="modal-card" style={{ '--accent': activeService.accent }}>
        <button
          className="modal-close"
          onClick={() => setShowModal(false)}
          disabled={isSubmitting}
        >×</button>

        <div className="modal-service-tag">{activeService.meta} · {activeService.setup}</div>

        <h3 className="modal-title">
          Book<br />
          <em>{activeService.title}</em>
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-group">
            <input
              {...register('name')}
              className={`field-input${errors.name ? ' error' : ''}`}
              type="text"
              placeholder="Your Full Name"
              disabled={isSubmitting}
              autoComplete="name"
            />
            {errors.name && <div className="field-error">{errors.name.message}</div>}
          </div>

          <div className="field-group">
            <input
              {...register('phone')}
              className={`field-input${errors.phone ? ' error' : ''}`}
              type="tel"
              placeholder="Phone Number (11 digits)"
              maxLength="11"
              disabled={isSubmitting}
            />
            {errors.phone && <div className="field-error">{errors.phone.message}</div>}
          </div>

          <div className="field-group">
            <input
              {...register('guests')}
              className={`field-input${errors.guests ? ' error' : ''}`}
              type="number"
              placeholder="Number of Guests"
              min="1"
              disabled={isSubmitting}
            />
            {errors.guests && <div className="field-error">{errors.guests.message}</div>}
          </div>

          <div className="field-group">
            <input
              {...register('date')}
              ref={(e) => { register('date').ref(e); dateInputRef.current = e; }}
              className={`field-input${errors.date ? ' error' : ''}`}
              type="date"
              min={getTodayDate()}
              disabled={isSubmitting}
            />
            {errors.date && <div className="field-error">{errors.date.message}</div>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <><div className="spinner" /> Processing…</>
            ) : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )}
</div>
    </>
  );
}
