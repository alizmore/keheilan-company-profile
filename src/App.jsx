import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralMesh from './components/NeuralMesh';
import { PerformanceChart, DonutChart, OrbAnimation } from './components/KAIFVisuals';
import { ChevronRight, ChevronLeft, ShieldCheck, Cpu, TrendingUp, BarChart3, PieChart, Info, Globe, Building2, Zap, Brain, Layers, Briefcase, Mail, CheckCircle2, ArrowUpRight } from 'lucide-react';

const slides = [
  // S01 - Cover
  {
    id: 's01',
    content: (
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="glass-card"
          style={{ padding: '5rem 6rem' }}
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="section-label"
          >
            EST. 2024
          </motion.div>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '0.5rem', letterSpacing: '0.4em' }}>KEHEILAN</h1>
          <h2 style={{ fontSize: '1rem', color: '#ffce7b', letterSpacing: '0.6em', marginBottom: '3rem', fontWeight: 400 }}>ASSET MANAGEMENT</h2>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #ffce7b, transparent)', width: '100%', marginBottom: '3rem' }}></div>
          <p style={{ fontSize: '1.4rem', marginBottom: '3rem', opacity: 0.8, fontStyle: 'italic', fontWeight: 300 }}>"Algorithmic Precision. Ethical Integrity."</p>
          <div className="flex gap-4 justify-center items-center">
            <span className="pill">AFM REGISTERED</span>
            <span className="pill">NETHERLANDS</span>
          </div>
        </motion.div>
      </div>
    )
  },
  // S02 - The Problem
  {
    id: 's02',
    content: (
      <div className="slide-content items-center text-center">
        <span className="section-label">THE MARKET GAP</span>
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          style={{ fontSize: '12rem', color: '#ffce7b', fontWeight: '800', lineHeight: 1, marginBottom: '1rem' }}
        >
          90%
        </motion.h1>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '4rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 4rem' }}>
          of active fund managers fail to beat the S&P 500 over 15 years
        </h2>
        <div className="grid-3">
          {[
            { title: 'Human Bias', desc: 'Emotional decisions and cognitive errors lead to inconsistent performance.', icon: <Brain size={24} color="#ffce7b" /> },
            { title: 'Static Portfolios', desc: 'Rigid strategies fail to adapt to rapid market regime shifts.', icon: <Zap size={24} color="#ffce7b" /> },
            { title: 'Imprecise Selection', desc: 'Manual screening overlooks thousands of data points daily.', icon: <Layers size={24} color="#ffce7b" /> }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="glass-card" 
              style={{ padding: '2.5rem' }}
            >
              <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <p style={{ marginTop: '4rem', fontSize: '0.75rem', opacity: 0.4, letterSpacing: '0.1em' }}>Source: SPIVA Scorecard, S&P Global</p>
      </div>
    )
  },
  // S03 - Who We Are
  {
    id: 's03',
    content: (
      <div className="slide-content">
        <div className="grid-2">
          <div>
            <span className="section-label">OUR IDENTITY</span>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>WHO WE ARE</h2>
            <p style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '2.5rem', opacity: 0.9 }}>
              Keheilan is a multi-strategy Shariah-compliant investment firm bridging the gap between <span style={{ color: '#ffce7b' }}>cutting-edge AI</span> and <span style={{ color: '#ffce7b' }}>ethical finance</span>.
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '3rem', opacity: 0.7, lineHeight: 1.6 }}>
              AFM Registered in the Netherlands, we serve HNWIs, family offices, and institutional fund managers globally.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="pill">AFM REGISTERED</span>
              <span className="pill">IB CUSTODIAN</span>
              <span className="pill">SHARIAH COMPLIANT</span>
            </div>
          </div>
          <div className="glass-card flex items-center justify-center" style={{ height: '450px' }}>
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ textAlign: 'center' }}
            >
              <ShieldCheck size={120} color="#ffce7b" style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(255, 206, 123, 0.4))' }} />
              <h4 style={{ color: 'white', letterSpacing: '0.2em' }}>Founded on Integrity</h4>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  // S04 - Our Strategies
  {
    id: 's04',
    content: (
      <div className="slide-content">
        <div className="text-center mb-12">
          <span className="section-label">INVESTMENT UNIVERSE</span>
          <h2 style={{ fontSize: '3rem' }}>OUR STRATEGIES</h2>
        </div>
        <div className="grid-2-2">
          {[
            { name: 'KAIF', desc: 'AI-managed global equity portfolio optimized for risk-adjusted returns.', badge: 'EQUITY', stats: 'Proprietary AI' },
            { name: 'FIXED INCOME', desc: 'Predictable returns through Shariah-compliant sukuk and yield instruments.', badge: 'STABLE', stats: 'Capital Preservation' },
            { name: 'DIRECT INDEXING', desc: 'Passive, low-cost exposure to Shariah-screened market indices.', badge: 'PASSIVE', stats: 'Passive Efficiency' },
            { name: 'VENTURE CAPITAL', desc: 'Early-stage investments in disruptive technology and ethical founders.', badge: 'GROWTH', stats: 'Multi-stage Alpha' }
          ].map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card" 
              style={{ padding: '2.5rem' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 style={{ color: 'white' }}>{s.name}</h3>
                <span className="pill" style={{ fontSize: '0.65rem' }}>{s.badge}</span>
              </div>
              <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem' }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffce7b', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} />
                {s.stats}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
  // S05 - KAIF Overview
  {
    id: 's05',
    content: (
      <div className="slide-content text-center">
        <span className="section-label">STRATEGY FOCUS</span>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>KAIF SYSTEM ARCHITECTURE</h2>
        <p style={{ marginBottom: '5rem', opacity: 0.7, fontSize: '1.2rem' }}>Global equities managed by proprietary AI pipelines.</p>
        
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ position: 'absolute', top: '30px', left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,206,123,0.5), transparent)', zIndex: 0 }}></div>
          {[
            { label: 'Scans', sub: '10,000+ Equities' },
            { label: 'Filters', sub: 'Shariah/Zero Exposure' },
            { label: 'Scores', sub: 'Multi-factor AI' },
            { label: 'Stress-Tests', sub: 'Parallel Backtests' },
            { label: 'Executes', sub: 'Fully Systematic' }
          ].map((p, i) => (
            <div key={i} style={{ position: 'relative', zIndex: 1, width: '180px' }}>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.2 }}
                style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-teal)', border: '1px solid #ffce7b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#ffce7b', boxShadow: '0 0 20px rgba(255,206,123,0.2)' }}
              >
                {i + 1}
              </motion.div>
              <h4 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.8rem' }}>{p.label}</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.5, lineHeight: 1.4 }}>{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  // S06 - Intelligence Engine
  {
    id: 's06',
    content: (
      <div className="slide-content">
        <div className="grid-2">
          <div>
            <span className="section-label">PROPRIETARY ALPHA</span>
            <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>INTELLIGENCE ENGINE</h2>
            <p style={{ fontSize: '1.3rem', color: '#ffce7b', marginBottom: '3.5rem', letterSpacing: '0.1em' }}>"Every Signal. Every Variable. Every Edge."</p>
            <div className="grid-2-2" style={{ gap: '1.5rem' }}>
              {['Sentiment Analysis', 'Fundamental Data', 'Technical Signals', 'Macro Variables'].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card" 
                  style={{ padding: '1.8rem', borderLeft: '3px solid #ffce7b' }}
                >
                  <CheckCircle2 size={18} color="#ffce7b" style={{ marginBottom: '0.8rem' }} />
                  <h4 style={{ fontSize: '0.9rem', color: 'white' }}>{item}</h4>
                </motion.div>
              ))}
            </div>
            <p style={{ mt: '3rem', opacity: 0.5, fontSize: '0.85rem', marginTop: '3.5rem', lineHeight: 1.6 }}>
              Powered by 8 proprietary software tools — built in-house, fully owned, and never disclosed to ensure absolute market edge.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <OrbAnimation />
          </div>
        </div>
      </div>
    )
  },
  // S07 - KAIF Performance
  {
    id: 's07',
    content: (
      <div className="slide-content">
        <div className="grid-2">
          <div>
            <span className="section-label">HISTORICAL ALPHA</span>
            <h2 style={{ marginBottom: '1rem' }}>PERFORMANCE</h2>
            <p style={{ opacity: 0.6, marginBottom: '3rem', fontSize: '1rem' }}>Year One: Apr 7 2025 – Apr 8 2026</p>
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <PerformanceChart />
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div style={{ width: '16px', height: '16px', background: '#ffce7b', borderRadius: '4px' }}></div> 
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>KAIF <span style={{ color: '#ffce7b' }}>+40.70%</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div style={{ width: '16px', height: '16px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div> 
                <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>S&P 500 +35.36%</span>
              </div>
            </div>
          </div>
          <div className="grid-2-2">
            {[
              { label: 'Cumulative Return', value: '+40.70%', vs: '+5.34 pts ahead' },
              { label: 'Sharpe Ratio', value: '2.93', vs: 'S&P: 2.08' },
              { label: 'Max Drawdown', value: '-2.69%', vs: 'S&P: -5.70%' },
              { label: 'Sortino Ratio', value: '11.32', vs: 'S&P: 4.82' }
            ].map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card" 
                style={{ padding: '2rem' }}
              >
                <p style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.8rem', fontWeight: 600 }}>{m.label}</p>
                <h3 style={{ fontSize: '2.4rem', color: '#ffce7b', marginBottom: '0.5rem' }}>{m.value}</h3>
                <div className="pill" style={{ fontSize: '0.65rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)' }}>{m.vs}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  // S08 - Portfolio Composition
  {
    id: 's08',
    content: (
      <div className="slide-content">
        <div className="grid-2">
          <div className="flex flex-col items-center">
            <span className="section-label">DIVERSIFICATION</span>
            <h3 style={{ marginBottom: '3rem' }}>SECTOR ALLOCATION</h3>
            <div style={{ position: 'relative' }}>
              <DonutChart data={[{percent: 0.33}, {percent: 0.10}, {percent: 0.08}, {percent: 0.06}, {percent: 0.43}]} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <PieChart size={40} color="#ffce7b" style={{ opacity: 0.5 }} />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8 max-w-sm">
              {[
                { l: 'Tech', v: '33.2%', c: '#ffce7b' },
                { l: 'Healthcare', v: '10.2%', c: 'rgba(5, 90, 87, 0.8)' },
                { l: 'Industrial', v: '8.4%', c: 'rgba(5, 90, 87, 0.6)' },
                { l: 'Telecomm', v: '6.5%', c: 'rgba(5, 90, 87, 0.4)' }
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.c }}></div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{s.l} {s.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ padding: '3rem' }}>
            <div className="flex justify-between items-center mb-8">
              <h4 style={{ color: 'white', letterSpacing: '0.2em' }}>TOP HOLDINGS</h4>
              <span className="pill" style={{ fontSize: '0.65rem' }}>100+ POSITIONS</span>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { name: 'GOOG - Alphabet Inc.', p: '4.92%' },
                { name: 'MSFT - Microsoft Corp.', p: '4.23%' },
                { name: 'NVDA - NVIDIA Corp.', p: '3.58%' },
                { name: 'AMZN - Amazon.com Inc.', p: '3.55%' },
                { name: 'META - Meta Platforms', p: '2.92%' }
              ].map((h, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ fontWeight: 600 }}>{h.name}</span>
                    <span style={{ color: '#ffce7b' }}>{h.p}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: h.p }} 
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }} 
                      style={{ height: '100%', background: 'var(--gold-gradient)', borderRadius: '3px' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>
              Portfolio is fully systematic with daily automated rebalancing.
            </div>
          </div>
        </div>
      </div>
    )
  },
  // S09 - Full Track Record
  {
    id: 's09',
    content: (
      <div className="slide-content">
        <div className="text-center mb-12">
          <span className="section-label">TRANSPARENCY</span>
          <h2 style={{ fontSize: '3rem' }}>MONTHLY TRACK RECORD</h2>
        </div>
        <div className="glass-card" style={{ padding: '0' }}>
          <table>
            <thead>
              <tr>
                <th>MONTH</th>
                <th>KAIF (%)</th>
                <th>S&P 500 (%)</th>
                <th>ALPHA (%)</th>
                <th style={{ textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { m: 'April 2025', k: '+5.24', s: '+9.82' },
                { m: 'May 2025', k: '+7.45', s: '+6.29' },
                { m: 'June 2025', k: '+6.05', s: '+5.08' },
                { m: 'July 2025', k: '+1.87', s: '+2.24' },
                { m: 'August 2025', k: '+1.24', s: '+2.03' },
                { m: 'March 2026', k: '-1.55', s: '-5.00' }
              ].map((r, i) => {
                const alpha = (parseFloat(r.k) - parseFloat(r.s)).toFixed(2);
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.m}</td>
                    <td style={{ color: r.k.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: 700 }}>{r.k}</td>
                    <td style={{ opacity: 0.7 }}>{r.s}</td>
                    <td style={{ color: '#ffce7b', fontWeight: 700 }}>{alpha}%</td>
                    <td style={{ textAlign: 'right' }}>
                      <TrendingUp size={16} color={parseFloat(alpha) > 0 ? '#4ade80' : '#ffce7b'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,206,123,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: 600 }}>
              10 Positive Months out of 13 | Consistent Alpha Generation in High-Volatility Regimes
            </p>
          </div>
        </div>
      </div>
    )
  },
  // S10 - Fixed Income
  {
    id: 's10',
    content: (
      <div className="slide-content">
        <div className="grid-2">
          <div>
            <span className="section-label">CONSERVATIVE GROWTH</span>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>FIXED INCOME</h2>
            <p style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '2.5rem', opacity: 0.9 }}>
              Shariah-compliant fixed income strategies focused on <span style={{ color: '#ffce7b' }}>capital preservation</span> and steady, predictable yield.
            </p>
            <div className="pill" style={{ opacity: 0.5 }}>STRATEGY IN DEPLOYMENT</div>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { t: 'Sukuk Optimization', d: 'Curated selection of sovereign and high-grade corporate sukuks.' },
              { t: 'Predictable Income', d: 'Regular distributions with low correlation to equity volatility.' },
              { t: 'Capital Preservation', d: 'Strict risk parameters focusing on investment-grade issuers.' }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass-card" 
                style={{ padding: '2rem' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ background: 'rgba(255,206,123,0.1)', padding: '0.8rem', borderRadius: '12px' }}>
                    <ShieldCheck size={20} color="#ffce7b" />
                  </div>
                  <h4 style={{ color: 'white', fontSize: '1rem' }}>{f.t}</h4>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6 }}>{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  // S11 - Direct Indexing
  {
    id: 's11',
    content: (
      <div className="slide-content">
        <div className="grid-2">
          <div>
            <span className="section-label">MARKET BETA</span>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>DIRECT INDEXING</h2>
            <p style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '2.5rem', opacity: 0.9 }}>
              Customizable, passive exposure to market indices with integrated <span style={{ color: '#ffce7b' }}>Shariah screening</span> at the individual security level.
            </p>
            <div className="pill" style={{ opacity: 0.5 }}>AVAILABLE NOW</div>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { t: 'Cost Efficiency', d: 'Lower total expense ratios compared to traditional mutual funds.' },
              { t: 'Custom Screening', d: 'Personalized ethical and religious filters tailored to your principles.' },
              { t: 'Tax Optimization', d: 'Direct ownership allows for efficient tax-loss harvesting strategies.' }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass-card" 
                style={{ padding: '2rem' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ background: 'rgba(255,206,123,0.1)', padding: '0.8rem', borderRadius: '12px' }}>
                    <Layers size={20} color="#ffce7b" />
                  </div>
                  <h4 style={{ color: 'white', fontSize: '1rem' }}>{f.t}</h4>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6 }}>{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  // S12 - Venture Capital
  {
    id: 's12',
    content: (
      <div className="slide-content">
        <div className="grid-2">
          <div>
            <span className="section-label">HIGH ALPHA</span>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>VENTURE CAPITAL</h2>
            <p style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '2.5rem', opacity: 0.9 }}>
              Backing the next generation of <span style={{ color: '#ffce7b' }}>disruptive technology</span> founders from seed to scale, focused on ethical innovation.
            </p>
            <div className="pill" style={{ opacity: 0.5 }}>ACTIVE PORTFOLIO</div>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { t: 'Strategic Advisory', d: 'Active board participation and hands-on mentorship for portfolio companies.' },
              { t: 'Multi-Stage Focus', d: 'Supporting growth from early seed rounds through Series B expansion.' },
              { t: 'Global Network', d: 'Direct access to institutional markets across Europe, MENA, and Asia.' }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass-card" 
                style={{ padding: '2rem' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ background: 'rgba(255,206,123,0.1)', padding: '0.8rem', borderRadius: '12px' }}>
                    <Zap size={20} color="#ffce7b" />
                  </div>
                  <h4 style={{ color: 'white', fontSize: '1rem' }}>{f.t}</h4>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6 }}>{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  // S13 - Fund Structure
  {
    id: 's13',
    content: (
      <div className="slide-content">
        <div className="text-center mb-12">
          <span className="section-label">OPERATIONS</span>
          <h2 style={{ fontSize: '3rem' }}>FUND STRUCTURE & TERMS</h2>
        </div>
        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {[
            { label: 'Fund Vehicle', val: 'Keheilan Fund (Stichting Legal Owner)', sub: 'Netherlands Domiciled' },
            { label: 'Regulatory', val: 'AFM Registered', sub: 'European Standard' },
            { label: 'Custodian', val: 'Interactive Brokers', sub: 'Secure Tier-1' },
            { label: 'Management Fee', val: '2.0% p.a.', sub: 'Annualized' },
            { label: 'Performance Fee', val: '20% with HWM', sub: 'High Water Mark' },
            { label: 'Entry Fee', val: 'Standard Terms', sub: 'Contact for Details' }
          ].map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card" 
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>{t.label}</p>
              <h4 style={{ fontSize: '1rem', color: '#ffce7b', marginBottom: '0.5rem' }}>{t.val}</h4>
              <p style={{ fontSize: '0.7rem', opacity: 0.3 }}>{t.sub}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: '5rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.7rem', opacity: 0.4, textAlign: 'center', lineHeight: 1.6 }}>
          LEGAL DISCLAIMER: Past performance is not indicative of future results. All investments involve risk, including the loss of principal. This presentation does not constitute an offer to sell or a solicitation of an offer to buy any securities.
        </div>
      </div>
    )
  },
  // S14 - Closing
  {
    id: 's14',
    content: (
      <div className="flex flex-col items-center justify-center text-center slide-content">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          whileInView={{ scale: 1, opacity: 1 }} 
          className="glass-card" 
          style={{ padding: '6rem' }}
        >
          <span className="section-label">PARTNERSHIP</span>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', letterSpacing: '0.2em' }}>THE FUTURE OF INTELLIGENT INVESTING</h2>
          <p style={{ fontSize: '1.4rem', marginBottom: '4rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
            "KAIF does not ask you to choose between <span style={{ color: '#ffce7b' }}>performance</span> and <span style={{ color: '#ffce7b' }}>principle</span>."
          </p>
          <div className="flex flex-col gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:invest@keheilan.com" 
              style={{ color: '#ffce7b', textDecoration: 'none', fontSize: '2rem', fontWeight: '800', letterSpacing: '0.05em' }}
            >
              invest@keheilan.com
            </motion.a>
            <a href="https://keheilan.com" style={{ color: 'white', textDecoration: 'none', opacity: 0.6, fontSize: '1.1rem', letterSpacing: '0.2em' }}>keheilan.com</a>
          </div>
          <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '3rem', opacity: 0.4, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em' }}>
            <span>NETHERLANDS</span>
            <span>AFM REGISTERED</span>
            <span>SHARIAH COMPLIANT</span>
          </div>
        </motion.div>
      </div>
    )
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="slide-container">
      <NeuralMesh />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'fixed', bottom: '3rem', right: '4rem', display: 'flex', gap: '1.5rem', zIndex: 100 }}>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,206,123,0.1)' }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide} 
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,206,123,0.3)', color: '#ffce7b', borderRadius: '50%', width: '64px', height: '64px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
        >
          <ChevronLeft size={32} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,206,123,0.1)' }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide} 
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,206,123,0.3)', color: '#ffce7b', borderRadius: '50%', width: '64px', height: '64px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
        >
          <ChevronRight size={32} />
        </motion.button>
      </div>
      
      <div style={{ position: 'fixed', bottom: '4.5rem', left: '4rem', opacity: 0.3, fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.3em', color: '#ffce7b' }}>
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
}

export default App;
