import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import FilteredProductsPage from './pages/FilteredProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products/:key' element={<FilteredProductsPage />} />
        <Route path='/product-detail/:id' element={<ProductDetailsPage />} />
        <Route path='/cart/:userId' element={<CartPage />} />
        <Route path='/checkout/:userId' element={<CheckoutPage />} />
        <Route path='/wishlist/:userId' element={<WishlistPage />} />
        <Route path='/orders/:userId' element={<OrderHistoryPage />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />

        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
