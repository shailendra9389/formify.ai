import Footer from '@/components/Footer'
import HeroSection from '@/components/ui/HeroSection'
import PricingPage from '@/components/ui/PricingPage'
import React from 'react'

export default function HomePage() {
  return (
    <div className='w-full'>
      <div className='grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20'>
        <HeroSection />
        <PricingPage />
        </div>
        <div className='w-full'>
          <Footer />
        </div>

      
    </div>

  )
}
