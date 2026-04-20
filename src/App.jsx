import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute><Layout><ProductListingPage /></Layout></ProtectedRoute>
            } />
            <Route path="/category/:slug" element={
              <ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute><Layout><ProductDetailPage /></Layout></ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute><Layout><CartPage /></Layout></ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute><Layout><CheckoutPage /></Layout></ProtectedRoute>
            } />
            <Route path="/order-success" element={
              <ProtectedRoute><Layout><OrderSuccessPage /></Layout></ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
