import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export const PerformanceChart = () => {
  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffce7b" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffce7b" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffce7b" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* S&P 500 Path */}
        <motion.polyline
          points="0,95 10,85 20,80 30,70 40,65 50,55 60,50 70,45 80,42 90,40 100,38"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.75"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        
        {/* KAIF Path */}
        <motion.polyline
          points="0,95 10,75 20,78 30,55 40,58 50,35 60,38 70,15 80,18 90,5 100,2"
          fill="none"
          stroke="#ffce7b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        
        {/* Highlight points */}
        <motion.circle cx="100" cy="2" r="2" fill="#ffce7b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} />
        <motion.circle cx="100" cy="38" r="1.5" fill="rgba(255,255,255,0.4)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} />
      </svg>
      <div className="flex justify-between mt-6 opacity-30 text-[10px] tracking-[0.2em] font-bold">
        <span>APR 2025</span>
        <span>FISCAL YEAR ONE</span>
        <span>APR 2026</span>
      </div>
    </div>
  );
};

export const DonutChart = ({ data }) => {
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <svg viewBox="-1.2 -1.2 2.4 2.4" style={{ transform: 'rotate(-90deg)', width: '350px', height: '350px', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}>
      <defs>
        <linearGradient id="sliceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffce7b" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      {data.map((slice, i) => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
        const pathData = [
          `M ${startX} ${startY}`,
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L 0 0`,
        ].join(' ');
        
        return (
          <motion.path
            key={i}
            d={pathData}
            fill={i === 0 ? 'url(#sliceGradient)' : `rgba(5, 90, 87, ${0.9 - i * 0.15})`}
            stroke="black"
            strokeWidth="0.02"
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: "backOut" }}
          />
        );
      })}
      <circle cx="0" cy="0" r="0.75" fill="#000" />
      <circle cx="0" cy="0" r="0.74" fill="none" stroke="rgba(255,206,123,0.1)" strokeWidth="0.01" />
    </svg>
  );
};

export const OrbAnimation = () => (
  <div style={{ position: 'relative', width: '400px', height: '400px' }}>
    <motion.div
      animate={{ 
        rotate: 360,
        scale: [1, 1.05, 1],
      }}
      transition={{ 
        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid rgba(255, 206, 123, 0.15)',
        position: 'absolute',
        boxShadow: 'inset 0 0 40px rgba(255, 206, 123, 0.05)'
      }}
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      style={{
        width: '85%',
        height: '85%',
        top: '7.5%',
        left: '7.5%',
        borderRadius: '50%',
        border: '1px solid rgba(5, 90, 87, 0.3)',
        position: 'absolute'
      }}
    />
    <motion.div
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 12, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{
        width: '70%',
        height: '70%',
        top: '15%',
        left: '15%',
        borderRadius: '50%',
        border: '1px dashed rgba(255, 206, 123, 0.2)',
        position: 'absolute'
      }}
    />
    
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '140px',
      height: '140px',
      background: 'radial-gradient(circle, rgba(255, 206, 123, 0.3) 0%, transparent 70%)',
      opacity: 0.6,
      borderRadius: '50%',
      filter: 'blur(30px)'
    }} />
    
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ 
          filter: ['drop-shadow(0 0 10px rgba(255,206,123,0.4))', 'drop-shadow(0 0 25px rgba(255,206,123,0.8))', 'drop-shadow(0 0 10px rgba(255,206,123,0.4))']
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Brain size={80} color="#ffce7b" strokeWidth={1.5} />
      </motion.div>
    </div>
  </div>
);
