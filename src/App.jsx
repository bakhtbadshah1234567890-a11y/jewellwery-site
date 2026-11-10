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
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CollectionDetailPage from './pages/CollectionDetailPage.jsx'
import BespokePage from './pages/BespokePage.jsx'
import StandardsPage from './pages/StandardsPage.jsx'
import OurStoryPage from './pages/OurStoryPage.jsx'
import OurProcessPage from './pages/OurProcessPage.jsx'
import SizingKitPage from './pages/SizingKitPage.jsx'
import TrunkShowPage from './pages/TrunkShowPage.jsx'
import JournalPage from './pages/JournalPage.jsx'
import JournalDetailPage from './pages/JournalDetailPage.jsx'
import ShippingPage from './pages/ShippingPage.jsx'
import ReturnsPage from './pages/ReturnsPage.jsx'
import WarrantyPage from './pages/WarrantyPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import CookiesPage from './pages/CookiesPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
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
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/collections/:slug" element={<CollectionDetailPage />} />
              <Route path="/bespoke" element={<BespokePage />} />
              <Route path="/standards" element={<StandardsPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/our-process" element={<OurProcessPage />} />
              <Route path="/sizing-kits" element={<SizingKitPage />} />
              <Route path="/trunk-show" element={<TrunkShowPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<JournalDetailPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/warranty" element={<WarrantyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/account" element={<AccountPage />} />
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
