import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { CartProvider } from './context/CartContext.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import SearchModal from './components/SearchModal.jsx'

// Pages
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import BespokePage from './pages/BespokePage.jsx'
import StandardsPage from './pages/StandardsPage.jsx'
import SizingKitPage from './pages/SizingKitPage.jsx'
import TrunkShowPage from './pages/TrunkShowPage.jsx'
import JournalPage from './pages/JournalPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
          <Header />
          <CartDrawer />
          <SearchModal />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/collections/:slug" element={<ShopPage />} />
              <Route path="/bespoke" element={<BespokePage />} />
              <Route path="/standards" element={<StandardsPage />} />
              <Route path="/sizing-kits" element={<SizingKitPage />} />
              <Route path="/trunk-show" element={<TrunkShowPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}
