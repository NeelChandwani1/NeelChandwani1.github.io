'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gridPoints, setGridPoints] = useState<Array<{ id: string; x: number; y: number; delay: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Using scrollYProgress for potential future scroll-based animations
  useTransform(scrollYProgress, [0, 1], [0, 200]);
  useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Generate grid points
  useEffect(() => {
    setIsMounted(true);
    
    const updateGrid = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cols = Math.floor(width / 60);
      const rows = Math.floor(height / 60);
      const points = [];
      
      for (let i = 0; i < cols * rows; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        points.push({
          id: `point-${i}`,
          x: (col / (cols - 1)) * 100,
          y: (row / (rows - 1)) * 100,
          delay: Math.random() * 2
        });
      }
      
      setGridPoints(points);
    };
    
    updateGrid();
    window.addEventListener('resize', updateGrid);
    
    return () => {
      window.removeEventListener('resize', updateGrid);
    };
  }, []);
  
  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };
  
  if (!isMounted) {
    return null;
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4 text-foreground dark:bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Animated grid background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-background/50"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          opacity: 0.8,
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />
      
      {/* Floating blobs */}
      <motion.div 
        className="absolute left-[-10%] top-[-10%] h-[150px] w-[150px] rounded-full bg-primary/20 blur-2xl"
        style={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 15, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute right-[-10%] bottom-[-10%] h-[150px] w-[150px] rounded-full bg-purple-500/20 blur-2xl"
        style={{
          x: -mousePosition.x * 0.05,
          y: -mousePosition.y * 0.05,
          background: 'radial-gradient(circle, hsl(var(--neon-purple) / 0.2) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      {/* Grid points */}
      <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
        {gridPoints.map((point) => (
          <motion.circle
            key={point.id}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={1}
            className="fill-foreground/10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: point.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <motion.div 
          className="w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Hi, I&apos;m Neel
          </motion.h1>
          
          <motion.div 
            className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'UI/UX Enthusiast',
                2000,
                'Problem Solver',
                2000,
                'Tech Lover',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block min-h-[1.5em]"
            />
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-neon-purple px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-primary/30"
            >
              <CodeBracketIcon className="h-4 w-4" />
              View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/20 px-6 py-3 font-medium text-foreground backdrop-blur-sm transition-all hover:bg-primary/10"
            >
              <CodeBracketIcon className="h-4 w-4" />
              Get In Touch
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="text-xs">Scroll Down</span>
              <div className="h-6 w-px bg-muted-foreground/30"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
    </main>
  );
}
