import './App.css';
import { Route, Routes } from 'react-router';
import { Login } from './components/index';
import HomePage from './pages/HomePage';
import FilteredProductsPage from './pages/FilteredProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products/:key' element={<FilteredProductsPage />} />
        <Route path='/product-detail/:id' element={<ProductDetailsPage />} />
        <Route path='/cart/:userId' element={<CartPage />}></Route>
        <Route path='/checkout/:userId' element={<CheckoutPage />}></Route>
        <Route path='/wishlist/:userId' element={<WishlistPage />}></Route>
        <Route path='/orders/:userId' element={<OrderHistoryPage />}></Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
