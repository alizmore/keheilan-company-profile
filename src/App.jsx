import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralMesh from './components/NeuralMesh';
import { PerformanceChart, DonutChart, OrbAnimation, Heatmap, InvestmentSimulator } from './components/KAIFVisuals';
import {
  ShieldCheck, TrendingUp, Info, Globe, Building2, Zap, Brain,
  Layers, Briefcase, CheckCircle2, ArrowUpRight, Target,
  Landmark, LineChart, Users, ChevronRight, ChevronLeft,
} from 'lucide-react';
import heroPng from './assets/hero.png';

// Touch swipe — registered with passive:true so scroll is NEVER blocked
function useSwipe(containerRef, onLeft, onRight) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      // Only treat as slide-nav if clearly horizontal
      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 60) {
        if (dx < 0) onLeft();
        else onRight();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend',   onTouchEnd);
    };
  }, [containerRef, onLeft, onRight]);
}

// Module-level navigate ref so slide JSX can trigger navigation
const navigateRef = { fn: () => {} };

const HeroPattern = () => (
  <div style={{
    position: 'absolute', inset: 0,
    backgroundImage: `url(${heroPng})`,
    backgroundSize: 'cover', backgroundPosition: 'center',
    opacity: 0.09, mixBlendMode: 'luminosity',
    pointerEvents: 'none', zIndex: 0, borderRadius: 'inherit',
  }} />
);

// ─── Product separator slide (used for KAIF / VC / Sukuk / Direct Indexing) ───
const SeparatorSlide = ({ eyebrow, title, subtitle, badge, icon, accentColor = '#ffce7b' }) => (
  <div className="flex flex-col items-center justify-center text-center" style={{ width: '100%' }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
      style={{
        background: 'rgba(0,0,0,0.5)', border: `1px solid ${accentColor}26`,
        borderRadius: '32px', padding: '64px 80px', maxWidth: '680px', width: '100%',
        backdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroPattern />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ width: '72px', height: '72px', background: `${accentColor}14`, border: `1px solid ${accentColor}30`,
            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          {icon}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.28em', color: accentColor, textTransform: 'uppercase', marginBottom: '16px' }}>
          {eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          style={{ fontSize: '52px', fontWeight: '700', color: 'white', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: '16px' }}>
          {title}
        </motion.h1>
        <motion.div initial={{ width: 0 }} animate={{ width: '72px' }} transition={{ delay: 0.7 }}
          style={{ height: '1.5px', background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, margin: '0 auto 20px' }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ fontSize: '16px', fontWeight: '300', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '28px' }}>
          {subtitle}
        </motion.p>
        {badge && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.14em', color: accentColor,
              background: `${accentColor}14`, border: `1px solid ${accentColor}30`,
              padding: '6px 18px', borderRadius: '20px', display: 'inline-block' }}>
            {badge}
          </motion.span>
        )}
      </div>
    </motion.div>
  </div>
);

// ─── Slide definitions ───────────────────────────────────────────────────────
// Slide indices (keep in sync with the array below):
// 0  Keheilan Overview
// 1  Mission & Philosophy
// 2  Product Suite (3 categories)
// 3  Who We Are
// 4  KAIF Separator
// 5  The Problem
// 6  KAIF Architecture
// 7  Intelligence Engine
// 8  Performance
// 9  Portfolio Composition
// 10 Risk Faceoff
// 11 Fund Structure
// 12 Monthly Heatmap
// 13 Investment Simulator
// 14 VC Separator
// 15 VC Details
// 16 Private Equity Separator
// 17 Private Equity Details
// 18 Sukuk Separator
// 19 Sukuk Details
// 20 Direct Indexing Separator
// 21 Direct Indexing Details
// 22 Closing

const SLIDE_KAIF  = 4;
const SLIDE_VC    = 14;
const SLIDE_PE    = 16;
const SLIDE_SUKUK = 18;
const SLIDE_DI    = 20;

const slides = [
  // ── S00 · Keheilan Company Overview ──────────────────────────────────────
  {
    id: 's00-overview',
    content: (
      <div className="flex flex-col items-center justify-center text-center" style={{ width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,206,123,0.18)', borderRadius: '32px',
            padding: '56px 80px', backdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden',
            maxWidth: '760px', width: '100%' }}>
          <HeroPattern />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} style={{ marginBottom: '36px' }}>
              <img src="/logo.png" alt="Keheilan Asset Management" style={{ height: '160px', width: 'auto', filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.3))' }} />
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.3em', color: '#ffce7b', textTransform: 'uppercase', marginBottom: '16px' }}>
              COMPANY PROFILE
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              style={{ fontSize: '42px', fontWeight: '700', color: 'white', letterSpacing: '0.04em', lineHeight: 1.15, marginBottom: '12px' }}>
              KEHEILAN<br /><span style={{ color: '#ffce7b' }}>ASSET MANAGEMENT</span>
            </motion.h1>
            <motion.div initial={{ width: 0 }} animate={{ width: '72px' }} transition={{ delay: 0.9 }}
              style={{ height: '1.5px', background: 'linear-gradient(90deg, transparent, #ffce7b, transparent)', margin: '20px auto' }} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              style={{ fontSize: '16px', fontWeight: '300', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Multi-Strategy Shariah-Compliant Investment Firm dedicated to empowering growth and delivering lasting value.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
              style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['AFM REGISTERED', 'NETHERLANDS', 'SHARIAH-COMPLIANT', 'MULTI-STRATEGY'].map((badge, i) => (
                <span key={i} className="pill">{badge}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },

  // ── S01 · Mission & Philosophy ────────────────────────────────────────────
  {
    id: 's01-mission',
    content: (
      <div className="grid-2 items-center max-w-6xl" style={{ width: '100%' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="eyebrow">OUR MISSION</span>
          <h1 className="slide-title">INTEGRITY AT THE<br /><span>CORE OF CAPITAL</span></h1>
          <p className="slide-lead" style={{ marginBottom: '8px' }}>
            Keheilan Asset Management bridges cutting-edge AI with ethical finance. Every strategy we offer is grounded in Shariah compliance, transparency, and a commitment to creating lasting value for our partners.
          </p>
          <p style={{ fontSize: '13px', fontWeight: '500', color: '#ffce7b', opacity: 0.85, marginBottom: '32px', letterSpacing: '0.04em' }}>
            Focused on MENA. Backing companies with a genuine technical edge.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'AUM Strategy', value: 'Multi-Asset' },
              { label: 'Compliance', value: 'Shariah' },
              { label: 'Domicile', value: 'Netherlands' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '14px 20px', background: 'rgba(255,206,123,0.06)', border: '1px solid rgba(255,206,123,0.15)', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>{stat.label}</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#ffce7b' }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: <ShieldCheck size={22} color="#ffce7b" />, title: 'Ethical Foundation', desc: '100% Shariah-compliant screening across all strategies. Zero exposure to prohibited activities, no interest income.' },
            { icon: <Users size={22} color="#ffce7b" />, title: 'Client-First', desc: 'Serving corporations, family offices, HNWIs, and fund managers with bespoke, diversified investment solutions.' },
            { icon: <Brain size={22} color="#ffce7b" />, title: 'Deep Technology', desc: 'Proprietary AI systems and data-driven decision-making applied across every product we offer.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
              className="glass-card" style={{ padding: '20px 22px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(255,206,123,0.1)', width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,206,123,0.15)' }}>
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '5px' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', fontWeight: '300', opacity: 0.65, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    ),
  },

  // ── S02 · Product Suite (3 categories: Public Equity, Private Equity, VC) ──
  {
    id: 's02-products',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="eyebrow">OUR PRODUCTS</span>
          <h1 className="slide-title">THREE <span>INVESTMENT MANDATES</span></h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Partnering with technically-driven MENA companies. Click to explore.</p>
        </div>

        {/* ── Public Equity ── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.22em', color: '#ffce7b', textTransform: 'uppercase' }}>PUBLIC EQUITY</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,206,123,0.15)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
            {[
              { icon: <Brain size={20} color="#ffce7b" />, name: 'KAIF', sub: 'Keheilan AI Fund', desc: 'AI-managed global equities. Fully systematic, Shariah-screened.', ret: '+40%', retLabel: 'FY1 RETURN', idx: SLIDE_KAIF },
              { icon: <Landmark size={20} color="#ffce7b" />, name: 'Sukuk', sub: 'Shariah Fixed Income', desc: 'AI-optimized T-bill portfolio. Riba-free.', ret: '6%', retLabel: 'TARGET YIELD', idx: SLIDE_SUKUK },
              { icon: <LineChart size={20} color="#ffce7b" />, name: 'Direct Indexing', sub: 'Personalized Portfolios', desc: 'Security-level index tracking tailored to your values and risk profile.', ret: 'Bespoke', retLabel: 'CUSTOM FIT', idx: SLIDE_DI },
            ].map((p) => (
              <motion.div key={p.name}
                whileHover={{ borderColor: 'rgba(255,206,123,0.55)', y: -3 }}
                onClick={() => navigateRef.fn(p.idx)}
                className="product-card"
                style={{ cursor: 'pointer', padding: '18px 18px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ background: 'rgba(255,206,123,0.1)', border: '1px solid rgba(255,206,123,0.2)', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.icon}</div>
                  <ChevronRight size={14} color="rgba(255,206,123,0.4)" />
                </div>
                <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '3px' }}>{p.sub}</p>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '11px', fontWeight: '300', color: 'rgba(255,255,255,0.55)', lineHeight: 1.45, marginBottom: '12px', flex: 1 }}>{p.desc}</div>
                <div style={{ borderTop: '1px solid rgba(255,206,123,0.1)', paddingTop: '10px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#ffce7b', lineHeight: 1, textShadow: '0 0 20px rgba(255,206,123,0.35)' }}>{p.ret}</span>
                  <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.14em', color: 'rgba(255,206,123,0.5)', textTransform: 'uppercase' }}>{p.retLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Private Equity ── */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.22em', color: '#ffce7b', textTransform: 'uppercase' }}>PRIVATE EQUITY</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,206,123,0.15)' }} />
          </div>
          <motion.div
            whileHover={{ borderColor: 'rgba(255,206,123,0.45)', y: -2 }}
            onClick={() => navigateRef.fn(SLIDE_PE)}
            className="product-card"
            style={{ cursor: 'pointer', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(255,206,123,0.08)', border: '1px solid rgba(255,206,123,0.2)', borderRadius: '12px', width: '44px', height: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={20} color="#ffce7b" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '3px' }}>Direct Deals</p>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>Private Equity</div>
              <div style={{ fontSize: '11px', fontWeight: '300', color: 'rgba(255,255,255,0.55)' }}>$1M to $20M deal size. Variety of sectors.</div>
            </div>
            <span style={{ fontSize: '10px', fontWeight: '600', color: '#ffce7b', background: 'rgba(255,206,123,0.08)', border: '1px solid rgba(255,206,123,0.15)', padding: '3px 10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>$1M – $20M</span>
          </motion.div>
        </div>

        {/* ── Venture Capital ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.22em', color: '#92d0c7', textTransform: 'uppercase' }}>VENTURE CAPITAL</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(146,208,199,0.15)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { name: 'Pre-IPO Growth Stage Fund', sub: 'Late-stage companies approaching public markets', badge: 'PRE-IPO' },
              { name: 'Deeptech Fund', sub: 'Arabic AI, industrial tech, sustainable innovation. MENA.', badge: 'DEEP TECH' },
            ].map((vc) => (
              <motion.div key={vc.name}
                whileHover={{ borderColor: 'rgba(146,208,199,0.5)', y: -2 }}
                onClick={() => navigateRef.fn(SLIDE_VC)}
                className="product-card"
                style={{ cursor: 'pointer', padding: '18px 20px', borderColor: 'rgba(146,208,199,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ background: 'rgba(146,208,199,0.08)', border: '1px solid rgba(146,208,199,0.2)', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={18} color="#92d0c7" />
                  </div>
                  <ChevronRight size={14} color="rgba(146,208,199,0.4)" />
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '5px' }}>{vc.name}</div>
                <div style={{ fontSize: '11px', fontWeight: '300', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, marginBottom: '10px' }}>{vc.sub}</div>
                <span style={{ fontSize: '10px', fontWeight: '600', color: '#92d0c7', background: 'rgba(146,208,199,0.08)', border: '1px solid rgba(146,208,199,0.15)', padding: '3px 10px', borderRadius: '20px', display: 'inline-block' }}>{vc.badge}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // ── S03 · Who We Are ─────────────────────────────────────────────────────
  {
    id: 's03-about',
    content: (
      <div className="flex flex-col items-center justify-center text-center" style={{ width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
          style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,206,123,0.18)', borderRadius: '32px',
            padding: '52px 72px', backdropFilter: 'blur(28px)', position: 'relative', overflow: 'hidden',
            maxWidth: '800px', width: '100%' }}>
          <HeroPattern />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.3em', color: '#ffce7b', textTransform: 'uppercase', marginBottom: '14px' }}>
              WHO WE ARE
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ fontSize: '38px', fontWeight: '700', color: 'white', letterSpacing: '0.04em', lineHeight: 1.15, marginBottom: '8px' }}>
              KEHEILAN<br /><span style={{ color: '#ffce7b' }}>ASSET MANAGEMENT</span>
            </motion.h1>
            <motion.div initial={{ width: 0 }} animate={{ width: '64px' }} transition={{ delay: 0.65 }}
              style={{ height: '1.5px', background: 'linear-gradient(90deg, transparent, #ffce7b, transparent)', margin: '18px auto' }} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
              style={{ fontSize: '14px', fontWeight: '300', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
              A multi-strategy, Shariah-compliant investment firm serving institutions, family offices, and HNWIs.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
              {[
                { label: '6', sub: 'FUNDS' },
                { label: '$50M', sub: 'AUM' },
                { label: 'AFM', sub: 'REGISTERED' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '24px 36px', background: 'rgba(255,206,123,0.06)', border: '1px solid rgba(255,206,123,0.2)', borderRadius: '18px', minWidth: '140px' }}>
                  <p style={{ fontSize: '72px', fontWeight: '800', color: '#ffce7b', lineHeight: 1, marginBottom: '8px', textShadow: '0 0 40px rgba(255,206,123,0.25)' }}>{stat.label}</p>
                  <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{stat.sub}</p>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>
              <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '10px' }}>OFFICES</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { city: 'Cairo', country: 'Egypt' },
                  { city: 'Riyadh', country: 'Saudi Arabia' },
                  { city: 'Amsterdam', country: 'Netherlands' },
                ].map((loc) => (
                  <span key={loc.city} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px' }}>
                    <Globe size={12} color="rgba(255,206,123,0.7)" />
                    {loc.city}, {loc.country}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },

  // ── S04 · KAIF Separator ──────────────────────────────────────────────────
  {
    id: 's03-kaif-sep',
    content: <SeparatorSlide
      eyebrow="PRODUCT 01 · ASSET MANAGEMENT"
      title="KAIF"
      subtitle="Global Equities Managed by Proprietary AI — Fully systematic, Shariah-compliant, AFM regulated."
      badge="AFM REGISTERED · NETHERLANDS"
      icon={<Brain size={32} color="#ffce7b" />}
    />,
  },

  // ── S04 · The Problem ─────────────────────────────────────────────────────
  {
    id: 's04-problem',
    content: (
      <div className="flex flex-col items-center text-center max-w-5xl">
        <span className="eyebrow">THE MARKET GAP</span>
        <motion.h1 initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '180px', color: '#ffce7b', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.04em', textShadow: '0 0 80px rgba(255,206,123,0.25)' }}>
          90%
        </motion.h1>
        <p style={{ fontSize: '18px', fontWeight: '400', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>
          of active fund managers fail to beat the S&P 500 over 15 years
        </p>
        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '52px' }}>Source: SPIVA Scorecard</p>
        <div className="grid-3">
          {[
            { title: 'Human Bias', desc: 'Emotional decisions and cognitive errors lead to inconsistent performance.' },
            { title: 'Static Portfolios', desc: 'Rigid strategies fail to adapt to rapid market regime shifts.' },
            { title: 'Imprecise Selection', desc: 'Manual screening overlooks thousands of data points daily.' },
          ].map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: '36px 28px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', fontWeight: '300', opacity: 0.5, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── S05 · KAIF Architecture ───────────────────────────────────────────────
  {
    id: 's05-architecture',
    content: (
      <div className="max-w-6xl w-full text-center">
        <span className="eyebrow">OUR METHODOLOGY</span>
        <h1 className="slide-title">THE <span>KAIF</span> ARCHITECTURE</h1>
        <p className="slide-lead" style={{ margin: '0 auto 48px auto' }}>Our proprietary system scans, filters, and executes with precision across global equity markets.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '16px', position: 'relative' }}>
          {/* connector line — perfectly centred on the circle row */}
          <div style={{
            position: 'absolute', top: '36px', left: 'calc(10% + 36px)', right: 'calc(10% + 36px)',
            height: '2px', background: 'linear-gradient(90deg, #ffce7b, rgba(255,206,123,0.15))', zIndex: 0,
          }} />
          {[
            { label: 'Scans',        sub: '10,000+ Equities',    metric: 'Global Universe' },
            { label: 'Filters',      sub: 'Shariah/Zero Exposure', metric: 'Ethical Core' },
            { label: 'Scores',       sub: 'Multi-factor AI',      metric: 'Predictive Alpha' },
            { label: 'Stress-Tests', sub: 'Parallel Backtests',   metric: 'Risk Guard' },
            { label: 'Executes',     sub: 'Fully Systematic',     metric: 'Zero Slippage' },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* circle icon */}
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,206,123,0.08)', border: '2px solid rgba(255,206,123,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle2 size={30} color="#ffce7b" />
              </div>
              {/* step number — small */}
              <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.15em', color: 'rgba(255,206,123,0.6)', marginBottom: '6px' }}>STEP 0{i + 1}</p>
              {/* label — large and prominent */}
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{p.label}</h3>
              <p style={{ fontSize: '12px', fontWeight: '300', opacity: 0.6, marginBottom: '12px', lineHeight: 1.4 }}>{p.sub}</p>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#ffce7b', background: 'rgba(255,206,123,0.08)', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(255,206,123,0.2)' }}>{p.metric}</div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ── S06 · Intelligence Engine ─────────────────────────────────────────────
  {
    id: 's06-intelligence',
    content: (
      <div className="grid-2 items-center max-w-6xl">
        <div>
          <span className="eyebrow">THE ALPHA CORE</span>
          <h1 className="slide-title">THE <span>INTELLIGENCE</span> ENGINE</h1>
          <p className="slide-lead">A fully proprietary ecosystem of 8 software tools built in-house, never disclosed, and designed for one goal: absolute market edge.</p>
          <div className="flex flex-col gap-4 mt-8">
            {[
              { t: 'Sentiment Analysis', d: 'Processing millions of data points across global social and financial media.' },
              { t: 'Fundamental Data',   d: 'Deep-dive algorithmic analysis of balance sheets and cash flows.' },
              { t: 'Macro Variables',    d: 'Real-time tracking of interest rates, inflation, and geopolitical signals.' },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{ padding: '22px 24px', display: 'flex', gap: '18px', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255,206,123,0.1)', width: '56px', height: '56px', minWidth: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,206,123,0.15)' }}>
                  <Zap size={24} color="#ffce7b" />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{item.t}</h4>
                  <p style={{ fontSize: '13px', fontWeight: '300', opacity: 0.7 }}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}><OrbAnimation /></div>
      </div>
    ),
  },

  // ── S07 · Performance ─────────────────────────────────────────────────────
  {
    id: 's07-performance',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">HISTORICAL ALPHA</span>
          <h1 className="slide-title">PERFORMANCE & <span>TRACK RECORD</span></h1>
          <p className="perf-sub">Fiscal Year One: April 7 2025 – April 8 2026</p>
        </div>
        <div className="perf-flex" style={{ display: 'flex', gap: '32px' }}>
          <div className="perf-chart-panel" style={{ flex: 1.4, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '28px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.12em', opacity: 0.5 }}>CUMULATIVE RETURN vs S&P 500</h4>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><div style={{ width: '10px', height: '10px', background: '#ffce7b', borderRadius: '50%' }} /><span style={{ fontSize: '12px' }}>KAIF +40.70%</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><div style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }} /><span style={{ fontSize: '12px', opacity: 0.6 }}>S&P 500 +35.36%</span></div>
            </div>
            <PerformanceChart />
          </div>
          <div className="perf-metrics-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { label: 'Cumulative Return', value: '+40.70', vs: '+5.34 pts ahead' },
              { label: 'Sharpe Ratio',      value: '2.93',   vs: 'S&P: 2.08' },
              { label: 'Max Drawdown',      value: '-2.69',  vs: 'S&P: -5.70%' },
              { label: 'Sortino Ratio',     value: '11.32',  vs: 'S&P: 4.82' },
            ].map((m, i) => (
              <div key={i} className="metric-card" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,206,123,0.18)', borderRadius: '16px', padding: '24px 20px' }}>
                <p style={{ fontSize: '11px', fontWeight: '500', opacity: 0.6, textTransform: 'uppercase', marginBottom: '10px' }}>{m.label}</p>
                <h3 style={{ fontSize: '34px', fontWeight: '700' }}>
                  {m.value.split('.')[0]}<span style={{ fontSize: '18px', color: '#ffce7b' }}>.{m.value.split('.')[1] || '00'}%</span>
                </h3>
                <p style={{ fontSize: '12px', color: '#ffce7b', opacity: 0.85 }}>{m.vs}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // ── S08 · Portfolio Composition ───────────────────────────────────────────
  {
    id: 's08-portfolio',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="eyebrow">DIVERSIFICATION</span>
          <h1 className="slide-title">PORTFOLIO <span>COMPOSITION</span></h1>
        </div>
        <div className="holdings-flex" style={{ display: 'flex', gap: '40px' }}>
          <div className="holdings-donut-col" style={{ flex: '0 0 320px', textAlign: 'center' }}>
            <h4 className="mb-4">SECTOR ALLOCATION</h4>
            <DonutChart data={[]} />
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Tech 33%', 'Health 10%', 'Industrial 8%', 'Telecomm 6%'].map((l, i) => (
                <span key={i} className="pill" style={{ fontSize: '10px', padding: '4px 10px' }}>{l}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h4 className="mb-4">TOP 10 HOLDINGS</h4>
            <div className="glass-card" style={{ padding: '20px' }}>
              {[
                { ticker: 'GOOG', name: 'Alphabet Inc.',     w: '4.92%' },
                { ticker: 'MSFT', name: 'Microsoft Corp.',   w: '4.23%' },
                { ticker: 'NVDA', name: 'NVIDIA Corp.',      w: '3.58%' },
                { ticker: 'AMZN', name: 'Amazon.com Inc.',   w: '3.55%' },
                { ticker: 'META', name: 'Meta Platforms',    w: '2.92%' },
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', width: '60px' }}>{h.ticker}</span>
                  <span style={{ fontSize: '12px', fontWeight: '300', opacity: 0.5, flex: 1 }}>{h.name}</span>
                  <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: h.w, height: '100%', background: 'linear-gradient(90deg, #055a57, #ffce7b)' }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffce7b', width: '50px', textAlign: 'right' }}>{h.w}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '24px', opacity: 0.5, flexWrap: 'wrap' }}>
              {[['N. AMERICA','88.3%'],['EUROPE','8.5%'],['ASIA','2.8%']].map(([l,v]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>{l}</span><strong>{v}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ── S09 · Risk Faceoff ────────────────────────────────────────────────────
  {
    id: 's09-risk',
    content: (
      <div className="max-w-5xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">RISK MANAGEMENT</span>
          <h1 className="slide-title">THE <span>KAIF</span> vs S&P 500 FACE-OFF</h1>
        </div>
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: 'rgba(255,206,123,0.06)' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', opacity: 0.5, fontSize: '12px' }}>METRIC</th>
                <th style={{ padding: '16px 20px', color: '#ffce7b', fontSize: '12px' }}>KAIF</th>
                <th style={{ padding: '16px 20px', opacity: 0.5, fontSize: '12px' }}>S&P 500</th>
              </tr>
            </thead>
            <tbody>
              {[
                { m: 'Cumulative Return', k: '+40.70%', s: '+35.36%' },
                { m: 'Sharpe Ratio',      k: '2.93',    s: '2.08' },
                { m: 'Max Drawdown',      k: '-2.69%',  s: '-5.70%' },
                { m: 'Sortino Ratio',     k: '11.32',   s: '4.82' },
                { m: 'Volatility (Ann.)', k: '12.4%',   s: '16.8%' },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '18px 20px', opacity: 0.9 }}>{r.m}</td>
                  <td style={{ padding: '18px 20px', textAlign: 'center', fontWeight: '700', color: '#ffce7b', background: 'rgba(255,206,123,0.04)' }}>{r.k}</td>
                  <td style={{ padding: '18px 20px', textAlign: 'center', opacity: 0.5 }}>{r.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '28px', textAlign: 'center', padding: '18px 28px', background: 'rgba(255,206,123,0.04)', borderRadius: '10px', border: '1px solid rgba(255,206,123,0.12)' }}>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>KAIF delivers <strong>higher returns</strong> with <strong>lower volatility</strong> and <strong>significantly better risk-adjusted ratios</strong>.</p>
        </div>
      </div>
    ),
  },

  // ── S10 · Fund Structure ──────────────────────────────────────────────────
  {
    id: 's10-structure',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">OPERATIONS</span>
          <h1 className="slide-title">FUND <span>STRUCTURE</span> & TERMS</h1>
        </div>
        <div className="grid-3">
          {[
            { l: 'Fund Vehicle',     v: 'Keheilan Fund',       d: 'Stichting Legal Owner, Netherlands' },
            { l: 'Regulatory',       v: 'AFM Registered',      d: 'Netherlands Financial Authority' },
            { l: 'Custodian',        v: 'Interactive Brokers', d: 'Tier-1 Institutional Custody' },
            { l: 'Management Fee',   v: '2.0% p.a.',           d: 'Paid quarterly in arrears' },
            { l: 'Performance Fee',  v: '20% with HWM',        d: 'High Water Mark protection' },
            { l: 'Liquidity',        v: 'Monthly',             d: 'Flexible entry/exit terms' },
          ].map((t, i) => (
            <div key={i} className="glass-card" style={{ padding: '28px 24px', position: 'relative' }}>
              <p style={{ fontSize: '11px', fontWeight: '500', opacity: 0.5, textTransform: 'uppercase', marginBottom: '10px' }}>{t.l}</p>
              <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px' }}>{t.v}</h4>
              <p style={{ fontSize: '12px', fontWeight: '300', opacity: 0.75 }}>{t.d}</p>
              <Info size={18} style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── S11 · Monthly Heatmap ─────────────────────────────────────────────────
  {
    id: 's11-heatmap',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="eyebrow">MONTH BY MONTH</span>
          <h1 className="slide-title">The Full <span>Track Record</span></h1>
          <p className="perf-sub">Apr 2025 – Apr 2026 · Every month. Nothing hidden.</p>
        </div>
        <Heatmap />
      </div>
    ),
  },

  // ── S12 · Investment Simulator ────────────────────────────────────────────
  {
    id: 's12-simulator',
    content: (
      <div className="max-w-5xl w-full text-center">
        <span className="eyebrow">INTERACTIVE SIMULATOR</span>
        <h1 className="slide-title">See the <span>KAIF Edge</span></h1>
        <p className="slide-lead" style={{ margin: '0 auto 40px auto' }}>Calculate hypothetical cumulative returns across the live trading track record.</p>
        <InvestmentSimulator />
      </div>
    ),
  },

  // ── S13 · VC Separator ────────────────────────────────────────────────────
  {
    id: 's13-vc-sep',
    content: <SeparatorSlide
      eyebrow="PRODUCT 02 · VENTURE CAPITAL"
      title="DEEP TECH"
      subtitle="Backing transformative founders building the future of Arabic AI, industrial technology, and sustainable innovation across MENA."
      badge="MENA · DEEP TECH · GROWTH"
      icon={<TrendingUp size={32} color="#92d0c7" />}
      accentColor="#92d0c7"
    />,
  },

  // ── S14 · VC Details ──────────────────────────────────────────────────────
  {
    id: 's14-vc',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ marginBottom: '24px' }}>
          <span className="eyebrow" style={{ color: '#92d0c7' }}>KEHEILAN VENTURE CAPITAL</span>
          <h1 className="slide-title">BACKING THE FUTURE OF<br /><span style={{ color: '#92d0c7' }}>DEEP TECHNOLOGY</span></h1>
          <p className="slide-lead" style={{ marginBottom: 0 }}>
            Capital, mentorship, and strategic guidance for MENA's most technically ambitious founders.
          </p>
        </div>

        {/* Key metrics row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { label: '$3.5M', sub: 'Invested', highlight: false },
            { label: '$10M', sub: 'Current Value', highlight: false },
            { label: '2.86x', sub: 'Unrealized Return', highlight: true },
          ].map((m, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '12px 20px', flex: '1', minWidth: '100px', borderRadius: '12px',
              background: m.highlight ? 'rgba(255,206,123,0.08)' : 'rgba(146,208,199,0.06)',
              border: m.highlight ? '1px solid rgba(255,206,123,0.35)' : '1px solid rgba(146,208,199,0.2)',
            }}>
              <p style={{ fontSize: m.highlight ? '28px' : '22px', fontWeight: '800', lineHeight: 1, marginBottom: '4px', color: m.highlight ? '#ffce7b' : '#92d0c7', textShadow: m.highlight ? '0 0 30px rgba(255,206,123,0.3)' : 'none' }}>{m.label}</p>
              <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{m.sub}</p>
            </div>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
          {[
            {
              name: 'Remal',
              tag: 'PropTech / Real Estate',
              logo: '/logos/remal.png',
              desc: 'Digitizing real estate transactions across MENA.',
            },
            {
              name: 'WideBot AI',
              tag: 'Arabic AI Platform',
              logo: '/logos/widebot.png',
              detail: '$3M Pre-Series A',
              desc: 'Pioneering Arabic-language conversational AI across the Arab world.',
            },
            {
              name: 'Nawah',
              tag: 'EdTech / Scientific Research',
              logo: '/logos/Nawah.png',
              desc: 'Advanced research infrastructure for Arab-world scientists and educators.',
            },
            {
              name: 'Fruitful',
              tag: 'AgriTech / FoodTech',
              logo: '/logos/fruitful.jpeg',
              desc: 'Technology-driven food supply chains for a sustainable future.',
            },
          ].map((co, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              className="portfolio-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '5px' }}>{co.name}</h3>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#92d0c7', background: 'rgba(146,208,199,0.08)', border: '1px solid rgba(146,208,199,0.15)', padding: '3px 10px', borderRadius: '20px' }}>{co.tag}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <img src={co.logo} alt={co.name} style={{ maxHeight: '52px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.6))', opacity: 0.92 }} />
                  {co.detail && <span style={{ fontSize: '10px', color: '#ffce7b', opacity: 0.85 }}>{co.detail}</span>}
                </div>
              </div>
              <p style={{ fontSize: '12px', fontWeight: '300', opacity: 0.65, lineHeight: 1.5, marginTop: '8px' }}>{co.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },

  // ── S15 · Private Equity Separator ───────────────────────────────────────
  {
    id: 's15-pe-sep',
    content: <SeparatorSlide
      eyebrow="PRODUCT · PRIVATE EQUITY"
      title="DIRECT DEALS"
      subtitle="Hands-on investments in high-potential private companies. $1M to $20M deal size. Variety of sectors."
      badge="$1M – $20M · DIRECT DEALS"
      icon={<Briefcase size={32} color="#ffce7b" />}
    />,
  },

  // ── S16 · Private Equity Details ──────────────────────────────────────────
  {
    id: 's15-pe',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ marginBottom: '28px' }}>
          <span className="eyebrow">KEHEILAN PRIVATE EQUITY</span>
          <h1 className="slide-title">DIRECT EQUITY.<br /><span>HANDS-ON GROWTH.</span></h1>
          <p className="slide-lead" style={{ marginBottom: 0 }}>
            Direct investments into high-potential private companies. Worldwide opportunity mapping.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Left: 4 attribute cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: <TrendingUp size={20} color="#ffce7b" />, title: '$1M – $20M', sub: 'Deal Size', desc: 'Flexible ticket size across growth stages' },
              { icon: <Layers size={20} color="#ffce7b" />, title: 'Multi-Sector', sub: 'Focus', desc: 'Technology, healthcare, fintech, consumer' },
              { icon: <Users size={20} color="#ffce7b" />, title: 'Hands-On', sub: 'Approach', desc: 'Board seats, strategic guidance, network access' },
              { icon: <Globe size={20} color="#ffce7b" />, title: 'Global', sub: 'Reach', desc: 'Worldwide opportunity mapping across emerging and developed markets' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '14px 16px', background: 'rgba(255,206,123,0.04)', border: '1px solid rgba(255,206,123,0.1)', borderRadius: '12px' }}>
                <div style={{ background: 'rgba(255,206,123,0.1)', width: '36px', height: '36px', minWidth: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '1px' }}>{item.title} <span style={{ fontSize: '11px', fontWeight: '400', color: 'rgba(255,255,255,0.4)' }}>{item.sub}</span></h4>
                  <p style={{ fontSize: '12px', fontWeight: '300', opacity: 0.6, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: stat card + criteria pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,206,123,0.25)', borderRadius: '20px', padding: '28px', textAlign: 'center', flex: 1 }}>
              <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '12px' }}>MAXIMUM DEAL SIZE</p>
              <div style={{ fontSize: '80px', fontWeight: '800', color: '#ffce7b', lineHeight: 1, marginBottom: '6px', textShadow: '0 0 60px rgba(255,206,123,0.3)' }}>$20M</div>
              <p style={{ fontSize: '13px', fontWeight: '300', color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>per deal</p>
              <div style={{ padding: '12px', background: 'rgba(255,206,123,0.06)', borderRadius: '10px', border: '1px solid rgba(255,206,123,0.1)' }}>
                <p style={{ fontSize: '12px', fontWeight: '400', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  Direct equity participation. <span style={{ color: '#ffce7b', fontWeight: '600' }}>No intermediaries.</span>
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="glass-card" style={{ padding: '18px 20px' }}>
              <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '10px' }}>INVESTMENT CRITERIA</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Shariah-Compliant', 'Growth Stage', 'Proven Revenue', 'Global'].map(a => (
                  <span key={a} className="pill" style={{ fontSize: '11px' }}>{a}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  },

  // ── S18 · Sukuk Separator ─────────────────────────────────────────────────
  {
    id: 's15-sukuk-sep',
    content: <SeparatorSlide
      eyebrow="PRODUCT 03 · ASSET MANAGEMENT"
      title="SUKUK"
      subtitle="Shariah-compliant fixed income delivering stable, predictable returns — with a target benchmark ROI of 4–6% per annum."
      badge="4–6% TARGET ROI · RIBA-FREE"
      icon={<Landmark size={32} color="#ffce7b" />}
    />,
  },

  // ── S16 · Sukuk Details ───────────────────────────────────────────────────
  {
    id: 's16-sukuk',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="eyebrow">KEHEILAN SUKUK</span>
          <h1 className="slide-title">FIXED INCOME.<br /><span>WITHOUT COMPROMISE.</span></h1>
          <p className="slide-lead" style={{ margin: '0 auto' }}>
            AI-optimized sovereign T-bill portfolio. Risk-free rate. Shariah-compliant.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Left: How It Works */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: <Globe size={20} color="#ffce7b" />, title: '18 Countries', desc: 'Sovereign loan sourcing across 18 jurisdictions' },
              { icon: <Layers size={20} color="#ffce7b" />, title: 'T-Bill Mix', desc: '1yr, 3yr, 15yr, 20yr maturities blended for optimal yield' },
              { icon: <Brain size={20} color="#ffce7b" />, title: 'AI-Managed Weights', desc: 'Allocation adjusted by algorithm. No human bias.' },
              { icon: <ShieldCheck size={20} color="#ffce7b" />, title: 'Risk-Free Anchor', desc: 'Structured as the most secure, risk-free rate available' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '14px 16px', background: 'rgba(255,206,123,0.04)', border: '1px solid rgba(255,206,123,0.1)', borderRadius: '12px' }}>
                <div style={{ background: 'rgba(255,206,123,0.1)', width: '36px', height: '36px', minWidth: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>{item.title}</h4>
                  <p style={{ fontSize: '12px', fontWeight: '300', opacity: 0.6, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Target return + audience */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,206,123,0.25)', borderRadius: '20px', padding: '28px', textAlign: 'center', flex: 1 }}>
              <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '12px' }}>TARGET YIELD</p>
              <div style={{ fontSize: '80px', fontWeight: '800', color: '#ffce7b', lineHeight: 1, marginBottom: '6px', textShadow: '0 0 60px rgba(255,206,123,0.3)' }}>6%</div>
              <p style={{ fontSize: '13px', fontWeight: '300', color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>per annum</p>
              <div style={{ padding: '12px', background: 'rgba(255,206,123,0.06)', borderRadius: '10px', border: '1px solid rgba(255,206,123,0.1)' }}>
                <p style={{ fontSize: '12px', fontWeight: '400', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  Blended yield via <span style={{ color: '#ffce7b', fontWeight: '600' }}>AI-optimized</span> T-bill weighting
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="glass-card" style={{ padding: '18px 20px' }}>
              <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '10px' }}>DESIGNED FOR</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Shariah-Conscious Investors', 'Family Offices', 'Corporations', 'HNWIs', 'Fund Managers'].map(a => (
                  <span key={a} className="pill" style={{ fontSize: '11px' }}>{a}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  },

  // ── S17 · Direct Indexing Separator ──────────────────────────────────────
  {
    id: 's17-di-sep',
    content: <SeparatorSlide
      eyebrow="PRODUCT 04 · ASSET MANAGEMENT"
      title="DIRECT INDEXING"
      subtitle="Security-level index tracking tailored to your values, risk profile, and tax situation. Institutional-grade personalization, Shariah-compliant."
      badge="BESPOKE · SHARIAH-COMPLIANT"
      icon={<LineChart size={32} color="#ffce7b" />}
    />,
  },

  // ── S18 · Direct Indexing Details ────────────────────────────────────────
  {
    id: 's18-di',
    content: (
      <div className="max-w-6xl w-full">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">DIRECT INDEXING</span>
          <h1 className="slide-title">PERSONALIZED <span>INDEX TRACKING</span></h1>
          <p className="slide-lead" style={{ margin: '0 auto' }}>
            A sophisticated investment approach for HNWIs and institutions — track an index at the security level while tailoring holdings to your values, risk profile, and tax situation.
          </p>
        </div>
        <div className="grid-3" style={{ marginBottom: '32px' }}>
          {[
            { icon: <Target size={28} color="#ffce7b" />, title: 'Customization', desc: 'Full control at the individual security level. Exclude sectors, tilt toward preferred themes, or apply any custom screen.' },
            { icon: <ShieldCheck size={28} color="#ffce7b" />, title: 'Shariah-Compliant', desc: 'All holdings are screened against Shariah principles. Zero exposure to prohibited industries — built in from the ground up.' },
            { icon: <Users size={28} color="#ffce7b" />, title: 'Sophisticated Clients', desc: 'Designed for high-net-worth individuals, family offices, and institutions requiring bespoke institutional-grade portfolios.' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i }}
              className="glass-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(255,206,123,0.08)', border: '1px solid rgba(255,206,123,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', fontWeight: '300', opacity: 0.65, lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', padding: '24px 32px', background: 'rgba(255,206,123,0.04)', border: '1px solid rgba(255,206,123,0.15)', borderRadius: '16px', maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ fontSize: '15px', fontWeight: '300', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
            "Direct Indexing puts <span style={{ color: '#ffce7b', fontWeight: '600' }}>institutional-grade personalization</span> in your hands — the index as a starting point, your values as the filter."
          </p>
        </motion.div>
      </div>
    ),
  },

  // ── S19 · Closing ─────────────────────────────────────────────────────────
  {
    id: 's19-closing',
    content: (
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          className="glass-card" style={{ padding: '80px', maxWidth: '780px', position: 'relative', overflow: 'hidden' }}>
          <HeroPattern />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: '40px' }}>
              <img src="/logo.png" alt="Keheilan" style={{ height: '130px', width: 'auto', filter: 'brightness(1.1)' }} />
            </div>
            <h1 style={{ fontSize: '46px', fontWeight: '700', color: 'white', lineHeight: 1.2, marginBottom: '20px' }}>
              THE FUTURE OF <span style={{ color: '#ffce7b' }}>INTELLIGENT</span> INVESTING
            </h1>
            <p style={{ fontSize: '17px', fontWeight: '300', opacity: 0.75, lineHeight: 1.7, marginBottom: '48px' }}>
              "KAIF does not ask you to choose between performance and principle."
            </p>
            <a href="mailto:invest@keheilan.com" className="close-cta">CONTACT US TO INVEST</a>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '40px', flexWrap: 'wrap' }}>
              {[['EMAIL','invest@keheilan.com'],['WEBSITE','keheilan.com']].map(([label,val]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', opacity: 0.5, textTransform: 'uppercase', marginBottom: '4px' }}>{label}</p>
                  <p style={{ fontSize: '15px', fontWeight: '500' }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
];

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // Wire navigate ref so slide JSX can call it
  navigateRef.fn = setCurrentSlide;

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % slides.length), []);
  const prevSlide = useCallback(() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length), []);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Swipe nav — passive listeners, won't block content scroll
  useSwipe(containerRef, nextSlide, prevSlide);

  return (
    <div ref={containerRef} className="slide-container">
      <NeuralMesh />

      <div className="persistent-logo">
        <img src="/logo.png" alt="Keheilan" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="slide-content-wrapper"
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>

      {/* Slide counter */}
      <div className="slide-counter" style={{ position: 'fixed', bottom: '28px', right: '40px', fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', zIndex: 100, pointerEvents: 'none' }}>
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Confidential footer — desktop only */}
      <div className="confidential-footer" style={{ position: 'fixed', bottom: '32px', left: '44px', display: 'flex', flexDirection: 'column', gap: '3px', opacity: 0.5, zIndex: 100, pointerEvents: 'none' }}>
        <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.18em', textTransform: 'uppercase' }}>PRIVATE & CONFIDENTIAL</span>
        <span style={{ fontSize: '8.5px', fontWeight: '300', letterSpacing: '0.08em' }}>AFM REGISTERED · NETHERLANDS</span>
      </div>

      {/* Mobile swipe nav buttons */}
      <div className="mobile-nav">
        <button onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={18} /> PREV
        </button>
        <button onClick={nextSlide} aria-label="Next slide">
          NEXT <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default App;
