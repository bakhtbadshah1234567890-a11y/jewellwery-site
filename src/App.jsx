import './App.css'
import Header from './components/Header.jsx'
import Runing from './components/Runing.jsx'
import Part1 from './components/Part1.jsx'
import Necklace from './components/Necklace.jsx'
import Standard from './components/Standard.jsx'
import Category from './components/Category.jsx'
import Rush from './components/Rush.jsx'
import GenerateDesign from './components/GenerateDesign.jsx'
import LovedConfigurations from './components/LovedConfigurations.jsx'
import BezelPendant from './components/BezelPendant.jsx'
import Reviews from './components/Reviews.jsx'
import Journal from './components/Journal.jsx'
import SocialGrid from './components/SocialGrid.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      <Header />
      <main>
        <Runing />
        <Part1 />
        <Necklace />
        <Standard />
        <Category />
        <Rush />
        <GenerateDesign />
        <LovedConfigurations />
        <BezelPendant />
        <Reviews />
        <Journal />
        <SocialGrid />
      </main>
      <Footer />
    </div>
  )
}

export default App
