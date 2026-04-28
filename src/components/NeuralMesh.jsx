import React from 'react';
import { motion } from 'framer-motion';

const NeuralMesh = () => {
  return (
    <div className="neural-mesh">
      <svg width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="meshGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#ffce7b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffce7b" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        <motion.g 
          animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Nodes and Connections */}
          <line x1="200" y1="200" x2="400" y2="150" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="400" y1="150" x2="600" y2="300" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="600" y1="300" x2="350" y2="450" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="350" y1="450" x2="200" y2="200" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          
          <line x1="1000" y1="100" x2="1300" y2="200" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="1300" y1="200" x2="1150" y2="400" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="1150" y1="400" x2="1000" y2="100" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          
          <line x1="100" y1="700" x2="400" y2="800" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="400" y1="800" x2="250" y2="600" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="250" y1="600" x2="100" y2="700" stroke="#ffce7b" strokeWidth="0.5" strokeOpacity="0.2" />
          
          {/* Pulsing Nodes */}
          {[
            {x: 200, y: 200}, {x: 400, y: 150}, {x: 600, y: 300}, {x: 350, y: 450},
            {x: 1000, y: 100}, {x: 1300, y: 200}, {x: 1150, y: 400},
            {x: 100, y: 700}, {x: 400, y: 800}, {x: 250, y: 600}
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#ffce7b"
              animate={{ opacity: [0.3, 0.7, 0.3], r: [2, 3, 2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default NeuralMesh;
