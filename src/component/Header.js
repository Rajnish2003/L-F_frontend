// Done
import React  from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='headLink'>
        <ul>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/add"}>Add product</NavLink></li>
        <li><NavLink to={"/products"}>Products</NavLink></li>
        <li><NavLink to={"/about"}>About us</NavLink></li>
        </ul>
    </div>
  )
}

export default Header