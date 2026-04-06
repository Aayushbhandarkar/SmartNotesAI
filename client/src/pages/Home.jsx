import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { FiZap, FiFileText, FiDownload, FiCpu } from 'react-icons/fi'

function Home() {
  const navigate = useNavigate()
  
  const features = [
    {
      icon: <FiZap className="text-3xl" />,
      title: "Instant Generation",
      description: "Seconds. Not hours.",
      delay: 0.1
    },
    {
      icon: <FiFileText className="text-3xl" />,
      title: "Structured Output",
      description: "Clean. Organized. Ready.",
      delay: 0.2
    },
    {
      icon: <FiDownload className="text-3xl" />,
      title: "Export Anywhere",
      description: "PDF. Print. Share.",
      delay: 0.3
    }
  ]

  // Typing animation words
  const words = [
    "Photosynthesis",
    "Machine Learning",
    "Quantum Physics",
    "React Components",
    "Data Structures",
    "Cellular Biology"
  ]
  
  const [currentWord, setCurrentWord] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const handleTyping = () => {
      const current = words[wordIndex]
      
      if (isDeleting) {
        setCurrentWord(current.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
        
        if (charIndex === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      } else {
        setCurrentWord(current.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
        
        if (charIndex === current.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      }
    }
    
    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, wordIndex, words])

  return (
    <div className='min-h-screen relative overflow-hidden bg-white text-black'>
      {/* Grid Background - Figma Style 8px Grid System */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main Grid Lines - 8px system */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
          }}
        />
        
        {/* Subtle larger grid for visual hierarchy (32px = 4 blocks of 8px) */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />
        
        {/* Center vertical line accent */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
        
        {/* Horizontal center line accent */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Content - Higher z-index */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section - Text Left, Animation Right */}
        <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
          {/* Text - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: 6 }}
            className="transform-gpu order-1 lg:order-1"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1 className="text-5xl lg:text-6xl font-extrabold leading-tight
              bg-gradient-to-br from-black/90 via-black/60 to-black/90
              bg-clip-text text-transparent"
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
            >
              Create Smart <br /> AI Notes in Seconds
            </motion.h1>

            <motion.p whileHover={{ y: -2 }}
              className='mt-6 max-w-xl text-lg text-gray-700'
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
            >
              Generate exam-focused notes, project documentation,
              flow diagrams and revision-ready content using AI —
              faster, cleaner and smarter.
            </motion.p>

            <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{
                scale: 1.07
              }}
              whileTap={{ scale: 0.97 }}
              className='mt-10 px-10 py-3 rounded-xl
                          flex items-center gap-3
                          bg-gradient-to-br from-black/90 via-black/80 to-black/90
                          border border-white/10
                          text-white font-semibold text-lg
                          shadow-[0_25px_60px_rgba(0,0,0,0.7)]'>
              Get Started
            </motion.button>
          </motion.div>

          {/* Typing Animation - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center order-2 lg:order-2"
          >
            {/* Animated Card */}
            <motion.div
              whileHover={{
                y: -12,
                rotateX: 8,
                rotateY: -8,
                scale: 1.02,
              }}
              className="transform-gpu w-full max-w-md"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 overflow-hidden">
                {/* AI Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <FiCpu className="text-white text-2xl" />
                  </div>
                </div>
                
                {/* Typing Text */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
                    Try typing any topic
                  </p>
                  
                  <div className="flex items-center justify-center gap-1 flex-wrap">
                    <span className="text-gray-600 text-lg">→</span>
                    <div className="relative">
                      <span className="text-2xl md:text-3xl font-mono font-semibold text-gray-800">
                        {currentWord}
                      </span>
                      <span className="inline-block w-0.5 h-8 md:h-10 bg-gray-800 ml-1 animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Example Topics */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-2">Try these examples:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Physics", "Biology", "Code", "History"].map((topic) => (
                        <span 
                          key={topic}
                          className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Subtle Decorative Elements */}
            <div className="mt-8 flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
            </div>
          </motion.div>
        </section>

        {/* Minimalist Features Section - Horizontal Layout */}
        <section className='max-w-6xl mx-auto px-8 py-24'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 font-medium">
              Powered by Intelligence
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto" />
          </motion.div>

          {/* Features - Horizontal Grid (3 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="text-gray-600 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm font-normal">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-3 text-gray-400 text-sm font-medium tracking-wider">
              <span className="w-8 h-px bg-gray-300" />
              <span>AI · Simplicity · Speed</span>
              <span className="w-8 h-px bg-gray-300" />
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

export default Home