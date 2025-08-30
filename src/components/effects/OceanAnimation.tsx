'use client'

import { motion } from 'framer-motion'

export function OceanAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Enhanced animated wave layers with more vibrant colors */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(6, 78, 59, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(15, 118, 110, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(8, 145, 178, 0.7) 0%, transparent 70%),
            radial-gradient(ellipse at 30% 60%, rgba(20, 184, 166, 0.6) 0%, transparent 60%),
            linear-gradient(45deg, rgba(8, 145, 178, 0.5) 0%, rgba(6, 78, 59, 0.6) 50%, rgba(15, 118, 110, 0.5) 100%)
          `,
          backgroundSize: '300% 300%, 250% 250%, 400% 400%, 350% 350%, 200% 200%'
        }}
        animate={{
          backgroundPosition: [
            '0% 0%, 100% 100%, 0% 100%, 100% 0%, 0% 0%',
            '100% 100%, 0% 0%, 100% 0%, 0% 100%, 100% 100%',
            '0% 100%, 100% 0%, 0% 0%, 100% 100%, 0% 100%',
            '0% 0%, 100% 100%, 0% 100%, 100% 0%, 0% 0%'
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Additional wave pattern for more visibility */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 45%)
          `,
          backgroundSize: '400% 400%, 350% 350%, 300% 300%, 320% 320%'
        }}
        animate={{
          backgroundPosition: [
            '0% 0%, 0% 100%, 100% 0%, 100% 100%',
            '100% 100%, 100% 0%, 0% 100%, 0% 0%',
            '0% 100%, 0% 0%, 100% 100%, 100% 0%',
            '0% 0%, 0% 100%, 100% 0%, 100% 100%'
          ]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Enhanced wave ripples with more visibility */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(8, 145, 178, 0.3) 20px,
              rgba(8, 145, 178, 0.3) 40px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 30px,
              rgba(34, 197, 94, 0.25) 30px,
              rgba(34, 197, 94, 0.25) 60px
            )
          `
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Colorful Fish Swimming */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`fish-${i}`}
          className="absolute flex items-center justify-center"
          style={{
            width: '20px',
            height: '12px',
            left: `${5 + i * 12}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            x: [0, 150, 0],
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 8 + i % 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8
          }}
        >
          <div 
            className={`w-4 h-2 rounded-full ${i % 4 === 0 ? 'bg-orange-400' : i % 4 === 1 ? 'bg-yellow-400' : i % 4 === 2 ? 'bg-pink-400' : 'bg-purple-400'}`}
            style={{
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)'
            }}
          />
          <div 
            className={`w-2 h-3 ${i % 4 === 0 ? 'bg-orange-400' : i % 4 === 1 ? 'bg-yellow-400' : i % 4 === 2 ? 'bg-pink-400' : 'bg-purple-400'}`}
            style={{
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              marginLeft: '-2px'
            }}
          />
        </motion.div>
      ))}

      {/* Pearls */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`pearl-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg"
          style={{
            width: `${8 + i % 3}px`,
            height: `${8 + i % 3}px`,
            left: `${10 + i * 8}%`,
            top: `${60 + (i % 3) * 15}%`,
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.6), inset 0 0 6px rgba(255, 255, 255, 0.8)'
          }}
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 360],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 4 + i % 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3
          }}
        />
      ))}

      {/* Colorful Shells */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shell-${i}`}
          className="absolute"
          style={{
            width: '16px',
            height: '12px',
            left: `${15 + i * 14}%`,
            bottom: `${5 + (i % 3) * 10}%`,
          }}
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [0.9, 1.0, 0.9]
          }}
          transition={{
            duration: 6 + i % 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4
          }}
        >
          <div 
            className={`w-full h-full rounded-t-full ${i % 3 === 0 ? 'bg-gradient-to-br from-pink-300 to-rose-400' : i % 3 === 1 ? 'bg-gradient-to-br from-orange-300 to-amber-400' : 'bg-gradient-to-br from-purple-300 to-violet-400'}`}
            style={{
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
            }}
          />
        </motion.div>
      ))}

      {/* Animated Clams */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`clam-${i}`}
          className="absolute"
          style={{
            width: '18px',
            height: '14px',
            left: `${25 + i * 20}%`,
            bottom: `${2 + i * 5}%`,
          }}
          animate={{
            scaleY: [1, 0.7, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 3 + i % 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7
          }}
        >
          <div 
            className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)'
            }}
          />
        </motion.div>
      ))}

      {/* Enhanced floating ocean particles with more colors */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full backdrop-blur-sm shadow-lg ${
            i % 5 === 0 ? 'bg-gradient-to-br from-cyan-300/70 to-blue-400/90' :
            i % 5 === 1 ? 'bg-gradient-to-br from-emerald-300/70 to-teal-400/90' :
            i % 5 === 2 ? 'bg-gradient-to-br from-purple-300/70 to-violet-400/90' :
            i % 5 === 3 ? 'bg-gradient-to-br from-pink-300/70 to-rose-400/90' :
            'bg-gradient-to-br from-yellow-300/70 to-orange-400/90'
          }`}
          style={{
            width: `${4 + i % 5}px`,
            height: `${4 + i % 5}px`,
            left: `${5 + i * 4.5}%`,
            top: `${10 + (i % 6) * 15}%`,
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.4)'
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            opacity: [0.5, 1.0, 0.5],
            scale: [0.7, 1.4, 0.7]
          }}
          transition={{
            duration: 3 + i % 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15
          }}
        />
      ))}

      {/* Enhanced ocean bubbles with more variety */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute bg-gradient-to-tr from-cyan-100/60 to-blue-200/80 rounded-full backdrop-blur-sm border border-cyan-200/50 shadow-lg"
          style={{
            width: `${6 + i % 5}px`,
            height: `${6 + i % 5}px`,
            left: `${8 + i * 6}%`,
            bottom: `${5 + (i % 5) * 15}%`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 0.9, 0],
            scale: [0.3, 1.3, 0.3],
            x: [0, (i % 3 - 1) * 20, 0]
          }}
          transition={{
            duration: 4 + i % 4,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.4
          }}
        />
      ))}

      {/* Enhanced sunlight rays through water */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            linear-gradient(
              135deg,
              transparent 35%,
              rgba(255, 255, 255, 0.2) 42%,
              rgba(255, 255, 255, 0.12) 50%,
              transparent 58%
            ),
            linear-gradient(
              45deg,
              transparent 60%,
              rgba(34, 197, 94, 0.15) 68%,
              rgba(20, 184, 166, 0.08) 75%,
              transparent 82%
            ),
            linear-gradient(
              75deg,
              transparent 40%,
              rgba(59, 130, 246, 0.1) 50%,
              rgba(147, 51, 234, 0.05) 60%,
              transparent 70%
            )
          `
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Additional flowing water effect with more colors */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent,
              rgba(8, 145, 178, 0.15) 20%,
              rgba(34, 197, 94, 0.2) 40%,
              rgba(20, 184, 166, 0.15) 60%,
              rgba(59, 130, 246, 0.1) 80%,
              transparent
            )
          `,
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['-100% 0%', '200% 0%']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}