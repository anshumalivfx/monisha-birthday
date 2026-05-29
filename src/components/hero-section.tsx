'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 50,
        damping: 15,
      },
    },
  };

  const shimmerVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 text-center space-y-6 py-12"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        animate={{ x: [0, -30, 30, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      {/* Badge */}
      <motion.div variants={itemVariants}>
        <div className="inline-block px-4 py-2 rounded-full glass-card text-sm font-semibold text-pink-600">
          ✨ A SPECIAL DAY FOR SOMEONE SPECIAL ✨
        </div>
      </motion.div>

      {/* Main heading */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-gradient">
          Happy Birthday
        </h1>
      </motion.div>

      {/* Name with shimmer effect */}
      <motion.h2
        variants={itemVariants}
        className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light"
        style={{
          background: 'linear-gradient(90deg, #ff6b9d 0%, #f8b4d3 50%, #ff6b9d 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Monisha
      </motion.h2>

      {/* Message */}
      <motion.div variants={itemVariants} className="space-y-4">
        <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto font-light">
          On this beautiful day, we celebrate you and everything that makes you wonderful. Your smile brings joy, your kindness inspires us, and your presence makes the world more beautiful.
        </p>
      </motion.div>

      {/* Floating decorative elements */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`deco-${i}`}
          className="absolute pointer-events-none text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.4, 0], y: [20, -20, -40] }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
          }}
          style={{
            left: `${20 + i * 30}%`,
            top: '50%',
          }}
        >
          {['🌸', '💖', '🌷'][i]}
        </motion.div>
      ))}
    </motion.div>
  );
}
