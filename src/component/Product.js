//Done
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Product.css'

const Product = (e) => {
    const history=useNavigate();
    const { _id, name, writer, price, description, image } = e.product;
    const deleteHandler= async()=>{
        await axios.delete(`https://l-f-backend.onrender.com/products/${_id}`)
        .then(res=>res.data)
        .then(()=>history("/"))
        .then(()=>history("/products"));
       }
    return (
     <div className='info'>
       <div className='details'>
         <img src={image} alt={name} />
       </div>
       <h5>{name}</h5>
       <h5>GET by {writer}</h5>
       <p>Price ₹{price}</p>
       <p>{description}</p>
       <Link to={`/products/${_id}`}><button className='update'>Update</button></Link>
       <button className='update' onClick={deleteHandler}>Delete</button>
     </div>
  )
}

export default Product;