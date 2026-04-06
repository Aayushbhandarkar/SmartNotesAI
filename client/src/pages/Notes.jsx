import React, { useState } from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'
import { FiLoader, FiCheckCircle, FiCpu, FiFileText, FiBarChart2, FiDownload } from 'react-icons/fi'

function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits || 0
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [loadingStep, setLoadingStep] = useState(0)

  // Loading steps for better UX
  const loadingSteps = [
    { text: "Analyzing your topic...", icon: <FiCpu className="text-blue-400" /> },
    { text: "Generating structured notes...", icon: <FiFileText className="text-green-400" /> },
    { text: "Creating diagrams & charts...", icon: <FiBarChart2 className="text-purple-400" /> },
    { text: "Preparing PDF for download...", icon: <FiDownload className="text-orange-400" /> }
  ]

  // Simulate loading steps
  React.useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingSteps.length - 1) return prev + 1
          return prev
        })
      }, 2000)
      return () => clearInterval(interval)
    } else {
      setLoadingStep(0)
    }
  }, [loading])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8'>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] items-start flex md:items-center justify-between gap-4 flex-col md:flex-row"
      >
        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>
            SmartNotes AI
          </h1>
          <p className='text-sm text-gray-300 mt-1'>AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <button className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm' onClick={() => navigate("/pricing")}>
            <span className='text-xl'>💠</span>
            <span>{credits}</span>
            <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.97 }} className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold'>
              ➕
            </motion.span>
          </button>
          <button onClick={() => navigate("/history")} className='px-4 py-3 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-white hover:bg-white/20 transition flex items-center gap-2'>
            📚 Your Notes
          </button>
        </div>
      </motion.header>

      {/* Topic Form */}
      <motion.div className="mb-12">
        <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} setLoadingStep={setLoadingStep} />
      </motion.div>

      {/* Professional Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Main Loading Card */}
            <div className="relative z-10">
              {/* Animated Spinner */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-blue-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiCpu className="text-2xl text-gray-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Loading Steps */}
              <div className="space-y-4 mb-6">
                {loadingSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: loadingStep >= idx ? 1 : 0.3, x: 0 }}
                    transition={{ delay: idx * 0.3 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                      ${loadingStep >= idx ? 'bg-gray-50' : 'bg-transparent'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                      ${loadingStep > idx ? 'bg-green-100' : loadingStep === idx ? 'bg-blue-100 animate-pulse' : 'bg-gray-100'}`}
                    >
                      {loadingStep > idx ? (
                        <FiCheckCircle className="text-green-500 text-sm" />
                      ) : (
                        <span className="text-gray-400 text-xs">{step.icon}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${loadingStep >= idx ? 'text-gray-700' : 'text-gray-400'}`}>
                        {step.text}
                      </p>
                      {loadingStep === idx && (
                        <div className="mt-1 h-1 bg-blue-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            animate={{ width: ['0%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Loading Message */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-center"
              >
                <p className="text-sm text-gray-500">
                  {loadingSteps[loadingStep]?.text || "Almost there..."}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-6"
        >
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!result && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          className="max-w-2xl mx-auto h-64 rounded-2xl flex flex-col items-center justify-center bg-white/80 backdrop-blur-lg border-2 border-dashed border-gray-300 text-gray-500 shadow-inner"
        >
          <div className="relative">
            <span className="text-6xl mb-4">📘</span>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p className="text-lg font-medium text-gray-600 mb-2">Ready to create notes?</p>
          <p className="text-sm text-gray-400">Enter a topic above and let AI do its magic ✨</p>
        </motion.div>
      )}

      {/* Result Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='flex flex-col lg:grid lg:grid-cols-4 gap-6'
        >
          <div className='lg:col-span-1'>
            <Sidebar result={result} />
          </div>

          <div className='lg:col-span-3 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6'>
            <FinalResult result={result} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Notes