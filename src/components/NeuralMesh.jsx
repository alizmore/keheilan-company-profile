import React from 'react';
import { motion } from 'framer-motion';

const NeuralMesh = () => {
  const nodes = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5
  }));

  return (
    <div className="neural-background">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connections */}
        {nodes.map((node, i) => (
          nodes.slice(i + 1, i + 4).map((target, j) => (
            <motion.line
              key={`line-${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke="#ffce7b"
              strokeWidth="0.05"
              strokeOpacity="0.2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))
        ))}
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size / 10}
            fill="#ffce7b"
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              delay: node.delay
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default NeuralMesh;
