// Done
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from './Product';

const URL="https://l-f-backend.onrender.com/products";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) =>((res.data)));
}

const Products = () => {
    const [products,setProduct]=useState();
    useEffect(() => {
        fetchHandler().then(data =>(setProduct(data.products)));
    }, []);
  return (
    <div className='productPage'> 
        <ul>
            {products && products.map((product,i)=>(
                <li className='listObj' key={i}>
                    <Product product={product}/>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Products;