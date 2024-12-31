import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router';
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
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CategoriesPage from './pages/CategoriesPage';
import { IsAuth, Form, Success, Cancel, Tracking } from './components/index';
import { useDispatch } from 'react-redux';
import { login, logout } from "./store/authSlice";
import About from './pages/About';
import TermsAndCondition from './pages/TermsAndCondition';

function App() {

  // Get Data From Local Storage
  const user = JSON.parse(sessionStorage.getItem("user")) || false;
  const token = sessionStorage.getItem("token");

  // Dispatch
  const dispatch = useDispatch();

  // Get Current Location
  const location = useLocation();

  // Check if User Authorized
  const checkTokenExpiry = () => {
    const expireAt = sessionStorage.getItem('expire_at');
    if (expireAt) {
      const currentTime = new Date();
      const tokenExpiryTime = new Date(expireAt);

      if (currentTime > tokenExpiryTime) {
        sessionStorage.clear();
      }
    }
  }

  // Get User Credentials From Store
  const getCurrentProfile = () => {
    if (token) {
      dispatch(login(user));
      console.log(user)
    } 
    else dispatch(logout());
  }

  useEffect(() => {
    checkTokenExpiry();
    getCurrentProfile()
  }, [location.pathname])


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/products/:key' element={<FilteredProductsPage />} />
        <Route path='/product-detail/:id' element={<ProductDetailsPage />} />
        <Route element={<IsAuth />}>
          <Route path="/cart/:userId" element={<CartPage />} />
          <Route path='/checkout/:userId' element={<CheckoutPage />} />
          <Route path='/wishlist/:userId' element={<WishlistPage />} />
          <Route path='/orders/:userId' element={<OrderHistoryPage />} />
          <Route path='/order-tracking/:userId' element={<Tracking />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Route>
        <Route path='/privacy-policy' element={<PrivacyPolicyPage />}></Route>
        <Route path='/terms' element={<TermsAndCondition />}></Route>
        <Route path='/form' element={<Form />}></Route>
        <Route path='/about' element={<About />}></Route>

        <Route path='/success' element={<Success />}></Route>
        <Route path='/cancel' element={<Cancel />}></Route>

        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
