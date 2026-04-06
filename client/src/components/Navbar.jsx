import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import logo from "../assets/Book and brain fusion logo.png"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { FiCpu, FiPlus, FiUser, FiLogOut, FiClock } from 'react-icons/fi'

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const credits = userData?.credits || 0
    const [showCredits, setShowCredits] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSignOut = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/auth")
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='relative z-20 mx-6 mt-6'
        >
            {/* Minimalist Navbar Container - Cream/Off-white */}
            <div className='flex items-center justify-between px-6 py-3 rounded-2xl bg-[#faf8f5] border border-gray-100 shadow-sm'>
                
                {/* Logo Section */}
                <div 
                    className='flex items-center gap-2 cursor-pointer group'
                    onClick={() => navigate("/")}
                >
                    <img 
                        src={logo} 
                        alt="examnotes" 
                        className='w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105' 
                    />
                    <span className='text-lg font-medium text-gray-800 hidden sm:block'>
                        ExamNotes<span className='text-gray-400'> AI</span>
                    </span>
                </div>

                {/* Right Side Buttons */}
                <div className='flex items-center gap-3 relative'>
                    
                    {/* Credits Button */}
                    <div className='relative'>
                        <motion.div
                            onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='flex items-center justify-center gap-1.5
                                px-3 py-1.5 rounded-full
                                bg-white
                                border border-gray-200
                                text-gray-700 text-sm
                                cursor-pointer
                                hover:bg-gray-50 hover:border-gray-300 transition-all'
                        >
                            <FiCpu className="text-gray-500 text-sm" />
                            <span className="font-medium">{credits}</span>
                            <FiPlus className="text-gray-400 text-xs" />
                        </motion.div>
                        
                        <AnimatePresence>
                            {showCredits && 
                                <motion.div 
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 10, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-0 mt-3 w-64
                                        rounded-xl
                                        bg-white
                                        border border-gray-200
                                        shadow-lg
                                        p-4 text-gray-800 z-50'
                                >
                                    <h4 className='font-semibold mb-2 flex items-center gap-2 text-gray-900'>
                                        <FiCpu className="text-gray-600" />
                                        Buy Credits
                                    </h4>
                                    <p className='text-sm text-gray-500 mb-4'>
                                        Use credits to generate AI notes, diagrams & PDFs.
                                    </p>
                                    <button 
                                        onClick={() => { setShowCredits(false); navigate("/pricing") }} 
                                        className='w-full py-2 rounded-lg
                                            bg-gray-900 text-white font-medium text-sm
                                            hover:bg-gray-800 transition-all'
                                    >
                                        Buy More Credits
                                    </button>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>

                    {/* Profile Button */}
                    <div className='relative'>
                        <motion.div
                            onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='flex items-center justify-center
                                w-8 h-8 rounded-full
                                bg-white
                                border border-gray-200
                                text-gray-700 text-sm
                                cursor-pointer
                                hover:bg-gray-50 hover:border-gray-300 transition-all'
                        >
                            <span className='text-sm font-medium'>
                                {userData?.name?.slice(0, 1).toUpperCase() || <FiUser className="text-gray-500" />}
                            </span>
                        </motion.div>
                        
                        <AnimatePresence>
                            {showProfile && 
                                <motion.div 
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 10, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-0 mt-3 w-56
                                        rounded-xl
                                        bg-white
                                        border border-gray-200
                                        shadow-lg
                                        p-2 text-gray-800 z-50'
                                >
                                    {/* User Info */}
                                    <div className='px-3 py-2 mb-1 border-b border-gray-100'>
                                        <p className='text-sm font-medium text-gray-900'>{userData?.name}</p>
                                        <p className='text-xs text-gray-400'>{userData?.email}</p>
                                    </div>
                                    
                                    <MenuItem 
                                        icon={<FiClock className="text-sm" />}
                                        text="History" 
                                        onClick={() => { setShowProfile(false); navigate("/history") }}
                                    />
                                    <div className="h-px bg-gray-100 mx-2 my-1" />
                                    <MenuItem 
                                        icon={<FiLogOut className="text-sm" />}
                                        text="Sign Out" 
                                        red 
                                        onClick={handleSignOut}
                                    />
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

function MenuItem({ onClick, text, red, icon }) {
    return (
        <div
            onClick={onClick} 
            className={`
                w-full text-left px-3 py-2 text-sm
                transition-colors rounded-lg
                flex items-center gap-2 cursor-pointer
                ${red
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-600 hover:bg-gray-50"
                }
            `}
        >
            {icon && <span className="opacity-60">{icon}</span>}
            <span>{text}</span>
        </div>
    )
}

export default Navbar