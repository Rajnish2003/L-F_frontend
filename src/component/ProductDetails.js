import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails=()=>{
  const [inputs, setInputs] = useState({});
  const id = useParams().id;

      const [imgurl,setImgurl]=useState();
      const submitImage=async (e)=>{
      const data=new FormData()
      data.append("file",e.target.files[0])
        data.append("upload_preset","uploadMern")
        data.append("cloud_name","duxhjspsf")
        var config = {
          method: 'post',
              url: "https://api.cloudinary.com/v1_1/duxhjspsf/image/upload",
              headers:{"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"},
                 data : data
                };
                await axios(config)
                .then((res)=>{
                  setImgurl(res.data.url);
                })
                .catch((e)=>console.log(e));
           e.preventDefault();
  }

  const history=useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`https://l-f-backend.onrender.com/products/${id}`)
            .then((res) => res.data).then(data =>(setInputs(data.product)))
            .catch(()=>console.log("Error in fetchHandler"));
    };
    fetchHandler();
  }, [id]);
    
  const sendRequest= async()=>{
    await axios.put(`https://l-f-backend.onrender.com/products/${id}`,{
      name: String(inputs.name),
      writer: String(inputs.writer),
      price: String(inputs.price),
      description: String(inputs.description),
      image: String(!imgurl?inputs.image:imgurl),
    }).then(res=>(res.data))
      .catch(()=>console.log("error in sendRequest"));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(()=>history("/products"))
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

    return (
        <div className='center'>
          <h1>Update_Product</h1>
            {inputs && 
               <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="txt_field">
                  <input value={inputs.name} type="text" name="name" onChange={handleChange} autoComplete="off"/>
                  <span></span>
                  <label>Name of Product</label>
                </div>
                <div className="txt_field">
                  <input value={inputs.writer} type="text" name="writer" onChange={handleChange} autoComplete="off"/>
                  <span></span>
                  <label>Your Name</label>
                </div>
                <div className="txt_field">
                  <input value={inputs.price} type="text" name="price" onChange={handleChange} autoComplete="off"/>
                  <span></span>
                  <label>Expected price</label>
                </div>
                <div className="txt_field">
                  <textarea value={inputs.description} type="text" name="description" onChange={handleChange} autoComplete="off"/>
                  <span></span>
                  <label>Description</label>
                </div>
                <div className="upload">
                   <input type='file' onChange={submitImage}/>
                    {!imgurl?(<p> Image is not changed</p>):(<p>Image is changed</p>)}
                 </div>
                  <button className='updates' type='submit'>Update</button>
               </form>
            }
        </div>
      )
}


export default ProductDetails;