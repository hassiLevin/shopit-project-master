import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import NotFound from './components/Layout/NotFound'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3 mx-4'>
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/register/' element={<RegisterScreen />} />

          <Route path='/login' element={<LoginScreen />} />
          <Route path='/profile/' element={<ProfileScreen />} />

          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/register/shipping' element={<ShippingScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/cart/' element={<CartScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/admin/orders' element={<OrderListScreen />} />

          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/users' element={<UserListScreen />} />

          <Route
            path='/admin/productlist/:pageNumber'
            element={<ProductListScreen />}
          />
          <Route path='/admin/products' element={<ProductListScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />

          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route path='/search/:keyword' element={<HomeScreen />} />
          <Route path='/page/:pageNumber' element={<HomeScreen />} />
          <Route
            path='/search/:keyword/page/:pageNumber'
            element={<HomeScreen />}
          />
          <Route path='/products' element={<HomeScreen />} />
          <Route path='/' element={<HomeScreen />} />

          <Route
            path='/admin/product/:id/edit'
            element={<ProductEditScreen />}
          />

          <Route path='/' element={<HomeScreen />} />

          <Route path='/not-found' element={<NotFound />} />
          <Route element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
