import React from 'react'
import { motion } from 'framer-motion'

// Layout Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatbotButton from './components/ChatbotButton'

// Page Components
import Home from './pages/Home'

// Error Boundary Component
import ErrorBoundary from './components/ErrorBoundary'

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Navbar />
        
        <main className="flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Home />
          </motion.div>
        </main>
        
        <Footer />
        
        {/* Floating Chatbot */}
        <ChatbotButton />
      </div>
    </ErrorBoundary>
  )
}

export default App