import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
      <motion.div
        className="max-w-4xl mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 
          className="text-8xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-6"
          variants={item}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-4xl font-bold text-foreground mb-6"
          variants={item}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={item}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </motion.p>
        
        <motion.div variants={item}>
          <Link
            href="/"
            className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-blue-400 text-white font-medium text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          variants={item}
        >
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
