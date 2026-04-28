import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

// Accurate chart data derived from KAIF_Deck_proposal.html polyline points
// Original viewBox (x:40-580, y:0-200) → scaled to (x:0-800, y:0-240)
// SPX original:  40,160.7  85,133.1  130,109.3  175,98.3  220,88.1  265,69.4  310,57.0  355,55.7  400,55.4  445,47.5  490,51.7  535,79.0  580,58.6
// KAIF original: 40,179.0  85,147.7  130,120.3  175,111.4 220,105.3 265,81.7  310,64.4  355,61.5  400,65.5  445,39.2  490,45.8  535,54.3  580,37.2
const KAIF_PTS = "M0,215 L67,177 L133,144 L200,134 L267,126 L333,98 L400,77 L467,74 L533,79 L600,47 L667,55 L733,65 L800,45";
const SPX_PTS  = "M0,193 L67,160 L133,131 L200,118 L267,106 L333,83 L400,68 L467,67 L533,67 L600,57 L667,62 L733,95 L800,70";
const KAIF_FILL = "M0,215 L67,177 L133,144 L200,134 L267,126 L333,98 L400,77 L467,74 L533,79 L600,47 L667,55 L733,65 L800,45 L800,240 L0,240 Z";

export const PerformanceChart = () => {
  const months = ["Apr'25","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan'26","Feb","Mar","Apr'26"];
  return (
    <div className="chart-svg-container" style={{ width: '100%', height: '240px' }}>
      <svg viewBox="0 0 800 240" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="kaifFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffce7b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffce7b" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[48, 96, 144, 192].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}

        {/* X-axis month labels */}
        {months.map((m, i) => (
          <text
            key={i}
            x={i * (800 / 12)}
            y={235}
            fill="rgba(255,255,255,0.25)"
            fontSize="9"
            fontFamily="Montserrat, sans-serif"
            textAnchor="middle"
          >{m}</text>
        ))}

        {/* KAIF fill area */}
        <motion.path
          d={KAIF_FILL}
          fill="url(#kaifFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* S&P 500 line */}
        <motion.path
          d={SPX_PTS}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1400"
          initial={{ strokeDashoffset: 1400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.4 }}
        />

        {/* KAIF line */}
        <motion.path
          d={KAIF_PTS}
          stroke="#ffce7b"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1400"
          initial={{ strokeDashoffset: 1400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
        />

        {/* End-point dots */}
        <motion.circle cx="800" cy="70" r="4" fill="rgba(255,255,255,0.5)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} />
        <motion.circle cx="800" cy="45" r="5" fill="#ffce7b"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} />

        {/* Final value labels */}
        <motion.text x="780" y="62" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Montserrat,sans-serif" textAnchor="end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.7 }}>+35.36%</motion.text>
        <motion.text x="780" y="36" fill="#ffce7b" fontSize="10" fontFamily="Montserrat,sans-serif" fontWeight="700" textAnchor="end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }}>+40.70%</motion.text>
      </svg>
    </div>
  );
};

export const DonutChart = ({ data }) => {
  return (
    <div className="donut-ring" style={{ width: '240px', height: '240px', borderRadius: '50%', background: 'conic-gradient(#ffce7b 0deg 163deg, #3ecfb4 163deg 213deg, #5b9bd5 213deg 254deg, #e06c6c 254deg 286deg, #a78bfa 286deg 317deg, #f59e42 317deg 337deg, #7ecf8a 337deg 348deg, #d4a15e 348deg 356deg, #cf7b7b 356deg 360deg)', position: 'relative', marginBottom: '24px', margin: '0 auto' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150px', height: '150px', borderRadius: '50%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '34px', fontWeight: '700' }}>100+</span>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Positions</span>
      </div>
    </div>
  );
};

export const OrbAnimation = () => (
  <div className="glass-box-container" style={{ width: '400px', height: '400px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', border: '1px dashed rgba(255, 206, 123, 0.15)', boxShadow: 'inset 0 0 30px rgba(255, 206, 123, 0.03)' }}
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      style={{ position: 'absolute', width: '270px', height: '270px', borderRadius: '50%', border: '1px solid rgba(8, 92, 89, 0.5)' }}
    />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(255, 206, 123, 0.15)' }}
    />
    <motion.div
      animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: '64px', height: '64px', background: 'radial-gradient(circle, rgba(255, 206, 123, 1) 0%, rgba(255, 206, 123, 0.1) 80%)', borderRadius: '50%', boxShadow: '0 0 60px rgba(255, 206, 123, 0.4)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Brain size={32} color="#055a57" />
    </motion.div>
  </div>
);

/* ═══ MONTHLY HEATMAP ═══ */
const kaifMonths = [
  { m: "Apr'25", v: '+5.24%', bg: 'rgba(16,100,58,0.75)' },
  { m: 'May',    v: '+7.45%', bg: 'rgba(16,120,70,0.85)' },
  { m: 'Jun',    v: '+6.05%', bg: 'rgba(16,120,70,0.85)' },
  { m: 'Jul',    v: '+1.87%', bg: 'rgba(16,60,38,0.55)'  },
  { m: 'Aug',    v: '+1.24%', bg: 'rgba(16,60,38,0.55)'  },
  { m: 'Sep',    v: '+4.77%', bg: 'rgba(16,100,58,0.75)' },
  { m: 'Oct',    v: '+3.35%', bg: 'rgba(16,80,48,0.65)'  },
  { m: 'Nov',    v: '+0.54%', bg: 'rgba(16,60,38,0.55)'  },
  { m: 'Dec',    v: '-0.75%', bg: 'rgba(120,40,30,0.55)' },
  { m: "Jan'26", v: '+4.92%', bg: 'rgba(16,100,58,0.75)' },
  { m: 'Feb',    v: '-1.17%', bg: 'rgba(150,40,30,0.70)' },
  { m: 'Mar',    v: '-1.55%', bg: 'rgba(150,40,30,0.70)' },
  { m: 'Apr',    v: '+3.14%', bg: 'rgba(16,80,48,0.65)'  },
];
const spxMonths = [
  { m: "Apr'25", v: '+9.82%', bg: 'rgba(16,120,70,0.85)' },
  { m: 'May',    v: '+6.29%', bg: 'rgba(16,120,70,0.85)' },
  { m: 'Jun',    v: '+5.08%', bg: 'rgba(16,100,58,0.75)' },
  { m: 'Jul',    v: '+2.24%', bg: 'rgba(16,80,48,0.65)'  },
  { m: 'Aug',    v: '+2.03%', bg: 'rgba(16,80,48,0.65)'  },
  { m: 'Sep',    v: '+3.65%', bg: 'rgba(16,80,48,0.65)'  },
  { m: 'Oct',    v: '+2.34%', bg: 'rgba(16,80,48,0.65)'  },
  { m: 'Nov',    v: '+0.24%', bg: 'rgba(16,60,38,0.55)'  },
  { m: 'Dec',    v: '+0.06%', bg: 'rgba(16,60,38,0.55)'  },
  { m: "Jan'26", v: '+1.45%', bg: 'rgba(16,60,38,0.55)'  },
  { m: 'Feb',    v: '-0.76%', bg: 'rgba(120,40,30,0.55)' },
  { m: 'Mar',    v: '-4.98%', bg: 'rgba(180,30,20,0.85)' },
  { m: 'Apr',    v: '+3.92%', bg: 'rgba(16,80,48,0.65)'  },
];

export const Heatmap = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#ffce7b', marginBottom: '8px' }}>■ KAIF</div>
      <div className="heatmap-cells">
        {kaifMonths.map((c, i) => (
          <motion.div key={i} className="hm-cell" style={{ background: c.bg }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }}>
            <span className="hm-month">{c.m}</span>
            <span className="hm-val" style={{ color: c.v.startsWith('-') ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.95)' }}>{c.v}</span>
          </motion.div>
        ))}
      </div>
    </div>
    <div>
      <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.38)', marginBottom: '8px' }}>■ S&P 500 TR</div>
      <div className="heatmap-cells">
        {spxMonths.map((c, i) => (
          <motion.div key={i} className="hm-cell" style={{ background: c.bg }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.06 }}>
            <span className="hm-month">{c.m}</span>
            <span className="hm-val" style={{ color: c.v.startsWith('-') ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.95)' }}>{c.v}</span>
          </motion.div>
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Negative</span>
      <div style={{ display: 'flex', height: '10px', borderRadius: '5px', width: '200px', background: 'linear-gradient(90deg, #c0392b, #1a1a1a, #1a7a4a)' }} />
      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Positive</span>
      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginLeft: '12px' }}>KAIF: 10 positive months | S&P 500: 11 positive months</span>
    </div>
  </div>
);

/* ═══ INTERACTIVE SIMULATOR ═══ */
export const InvestmentSimulator = () => {
  const [amount, setAmount] = useState(5000000);
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const spxReturn = amount * 1.3536;
  const kaifReturn = amount * 1.4070;
  const spxProfit = spxReturn - amount;
  const kaifProfit = kaifReturn - amount;
  const alpha = kaifReturn - spxReturn;

  return (
    <div>
      <div style={{ marginBottom: '50px' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Hypothetical Investment Size</div>
        <motion.div style={{ fontSize: '56px', fontWeight: '700', color: 'white', marginBottom: '28px' }}
          key={amount} initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
          {fmt.format(amount)}
        </motion.div>
        <input type="range" min="120000" max="20000000" step="120000" value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          style={{ width: '100%', maxWidth: '600px' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div className="sim-card" style={{ width: '300px', textAlign: 'left' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>S&P 500 (+35.36%)</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{fmt.format(spxReturn)}</div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#49b0a1' }}>+{fmt.format(spxProfit)} Profit</div>
        </div>

        <div className="sim-card kaif-card" style={{ width: '340px', textAlign: 'left' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#ffce7b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>KAIF (+40.70%)</div>
          <div style={{ fontSize: '42px', fontWeight: '800', color: 'white', marginBottom: '6px' }}>{fmt.format(kaifReturn)}</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#ffce7b' }}>+{fmt.format(kaifProfit)} Profit</div>
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,206,123,0.2)', fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
            Alpha Generated: <strong style={{ color: '#ffce7b', fontSize: '18px', marginLeft: '4px' }}>+{fmt.format(alpha)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
