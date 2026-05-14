import { Routes, Route } from 'react-router-dom'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Header from './components/layout/Header'
import HeroSection from './components/sections/HeroSection'
import TrustBar from './components/sections/TrustBar'
import BrowseRangeSection from './components/sections/BrowseRangeSection'
import ShowroomsSection from './components/sections/ShowroomsSection'
import LumariSummit from './pages/product/LumariSummit'

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <HeroSection />
      <TrustBar />
      {/* <ShowroomsSection /> */}
      <BrowseRangeSection />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/lumari-summit" element={<LumariSummit />} />
    </Routes>
  )
}
