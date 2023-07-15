import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './component/Home'
import Header from './component/Header';
import Addproduct from './component/Addproduct';
import Products from './component/Products';
import About from './component/About';
import ProductDetails from './component/ProductDetails';
import './AllRoutes.css'

const AllRoutes = () => {
  return (
    <React.Fragment>
      <header className='header1'>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/add' element={<Addproduct/>} exact/>
          <Route path='/products' element={<Products/>} exact/>
          <Route path='/about' element={<About/>}/>
          <Route path='/products/:id' element={<ProductDetails/>}/>
        </Routes>
      </main>
    </React.Fragment>
  )
}

export default AllRoutes;