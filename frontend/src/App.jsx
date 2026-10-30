import Header from './components/Header'
import Countdown from './components/Countdown'
import Hero from './components/Hero'
import ClosingMessage from './components/ClosingMessage'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1a1a1a] selection:bg-[#ecd8b8] selection:text-[#1a1a1a]">
      {/* A. Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 1. Live Countdown Section (Primary Arrival Feature) */}
        <Countdown />

        {/* 2. Hero Section (Brand Narrative & Architectural Showcase) */}
        <Hero />

        {/* 3. Closing Message */}
        <ClosingMessage />
      </main>

      {/* E. Footer */}
      <Footer />
    </div>
  )
}
