import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { setChatbotController } from '../hooks/useChatbot'

const ChatbotButton: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const openChatbot = () => setIsChatbotOpen(true)
  const closeChatbot = () => setIsChatbotOpen(false)
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen)

  // Register global controller
  useEffect(() => {
    setChatbotController({ openChatbot, closeChatbot, toggleChatbot })
  }, [openChatbot, closeChatbot, toggleChatbot])

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-40 flex items-center justify-center transition-all duration-300 ${
          isChatbotOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1 // Delay appearance by 1 second
        }}
      >
        <AnimatePresence mode="wait">
          {isChatbotOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        {!isChatbotOpen && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        )}
      </motion.button>

      {/* Tooltip */}
      {!isChatbotOpen && (
        <motion.div
          className="fixed bottom-6 right-20 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium z-30"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.3 }}
        >
          Ask CropAI Assistant
          <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2">
            <div className="w-2 h-2 bg-gray-800 rotate-45"></div>
          </div>
        </motion.div>
      )}

      {/* Notification Badge */}
      {!isChatbotOpen && (
        <motion.div
          className="fixed bottom-16 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="text-xs text-white font-bold">!</span>
        </motion.div>
      )}

      {/* Simple Chatbot Placeholder */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-30 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-2xl">
              <h3 className="font-bold text-lg">CropAI Assistant</h3>
              <p className="text-green-100 text-sm">Coming Soon!</p>
            </div>
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">AI Assistant</h4>
                <p className="text-gray-600 mb-4">Our intelligent farming assistant will be available soon to help with all your agricultural questions!</p>
                <div className="text-sm text-green-600 font-semibold">Stay tuned for updates</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatbotButton