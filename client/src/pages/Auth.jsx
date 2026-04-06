import React, { useRef, useMemo } from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { FiArrowRight } from 'react-icons/fi'

// Import step images
import step1Img from '../assets/step1.png'
import step2Img from '../assets/step2.png'
import step3Img from '../assets/step3.png'

// Import your roro image
import roroImg from '../assets/roro.png'

/* ─── STEP CARD COMPONENT WITH 3D EFFECT ─── */
function StepCard({ number, image, title, isBig = false }) {
  return (
    <motion.div
      whileHover={{ 
        y: -12, 
        rotateX: 6, 
        rotateY: 6,
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 transition-all overflow-hidden transform-gpu cursor-pointer
        ${isBig ? 'scale-105 shadow-2xl' : ''}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 3D Shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Step Number Circle with 3D effect */}
      <div 
        className="absolute top-4 left-4 w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-md z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        <span className="text-white text-sm font-bold">{number}</span>
      </div>
      
      {/* Full Image */}
      <div className={`w-full ${isBig ? 'py-4' : ''}`}>
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-auto object-cover transition-transform duration-500 hover:scale-105
            ${isBig ? 'scale-110' : ''}`}
          style={{ transform: "translateZ(10px)" }}
        />
      </div>
    </motion.div>
  )
}

/* ─── AUTH PAGE WITH 3D RORO IMAGE ─── */

function Auth() {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const User = response.user
      const name = User.displayName
      const email = User.email
      const result = await axios.post(serverUrl + "/api/auth/google", { name, email }, {
        withCredentials: true
      })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  const steps = [
    {
      number: 1,
      image: step1Img,
      title: "Step 1",
      isBig: false
    },
    {
      number: 2,
      image: step2Img,
      title: "Step 2",
      isBig: true
    },
    {
      number: 3,
      image: step3Img,
      title: "Step 3",
      isBig: false
    }
  ]

  return (
    <div className='min-h-screen overflow-hidden bg-white text-black px-8 flex flex-col'>
      {/* MINIMALIST HEADER - Only Logo, No Black Box */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full mx-auto mt-8"
      >
        <h1 className='text-3xl font-bold text-gray-800'>
          SmartNotes <span className='text-gray-400'> AI</span>
        </h1>
      </motion.div>

      <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center flex-1'>
        {/* LEFT CONTENT - Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className='text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent'>
            Create Smart  <br /> AI Notes in Seconds
          </h1>
          <motion.button
            onClick={handleGoogleAuth}
            whileHover={{ y: -10, rotateX: 8, rotateY: -8, scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className='mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]'
          >
            <FcGoogle size={22} />
            Continue with Google
         </motion.button>

<p className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent'>
  Get started with <span className="font-semibold">50 free credits</span>.  
  Create notes, charts, and PDFs instantly using AI.
</p>

<p className='mt-4 text-sm text-gray-500'>
  Upgrade anytime • Instant access
</p>

</motion.div>

        {/* RIGHT CONTENT - 3D Roro Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <motion.div
            whileHover={{
              y: -15,
              rotateX: 10,
              rotateY: 10,
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="transform-gpu cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative">
              {/* 3D Shadow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl blur-2xl opacity-50 -z-10" />
              
              {/* Main Image with 3D effect */}
              <img 
                src={roroImg} 
                alt="Roro AI Assistant"
                className="w-full max-w-md lg:max-w-lg h-auto object-contain rounded-2xl"
                style={{ transform: "translateZ(30px)" }}
              />
              
              {/* Floating animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-16 h-1 bg-gray-200 rounded-full blur-sm" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* HOW IT WORKS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-7xl w-full mx-auto py-16 pb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Three simple steps to generate your AI notes
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <StepCard
              number={steps[0].number}
              image={steps[0].image}
              title={steps[0].title}
              isBig={steps[0].isBig}
            />
          </div>

          <div className="flex justify-center items-center">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-black/10 rounded-full p-3 md:p-4 shadow-lg"
            >
              <FiArrowRight className="text-2xl md:text-3xl text-gray-700" />
            </motion.div>
          </div>

          <div className="flex-1 w-full">
            <StepCard
              number={steps[1].number}
              image={steps[1].image}
              title={steps[1].title}
              isBig={steps[1].isBig}
            />
          </div>

          <div className="flex justify-center items-center">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-black/10 rounded-full p-3 md:p-4 shadow-lg"
            >
              <FiArrowRight className="text-2xl md:text-3xl text-gray-700" />
            </motion.div>
          </div>

          <div className="flex-1 w-full">
            <StepCard
              number={steps[2].number}
              image={steps[2].image}
              title={steps[2].title}
              isBig={steps[2].isBig}
            />
          </div>
        </div>

        <div className="md:hidden text-center mt-6">
          <p className="text-sm text-gray-400">→ Swipe to see steps →</p>
        </div>
      </motion.section>
    </div>
  )
}

export default Auth