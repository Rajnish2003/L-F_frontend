// Done
import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Addproduct.css'

const Addproduct = () => {
    const history=useNavigate();
    const [inputs, setinputs] = useState({
      name: '',
      writer: '',
      price: '',
      description: '',
    })
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

    const handleChange = (e) => {
        setinputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }

      const sendRequest = async () => {
        await axios.post("https://l-f-backend.onrender.com/products", {
          name: String(inputs.name),
          writer: String(inputs.writer),
          price: String(inputs.price),
          description: String(inputs.description),
          image: String(imgurl),
        }).then(res => res.data );
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(()=>history('/products'));
      }

    return (
       <div className='center'>
        <h1>Add_Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
         <div className="txt_field">
          <input type="text" name="name" autoComplete="off" onChange={handleChange}/>
          <span></span>
          <label>Name of Product</label>
        </div>
        <div className="txt_field">
          <input type="text" name="writer" autoComplete="off" onChange={handleChange}/>
          <span></span>
          <label>Your Name</label>
        </div>
        <div className="txt_field">
          <input type="text" name="price" autoComplete="off" onChange={handleChange}/>
          <span></span>
          <label>Expected price</label>
        </div>
        <div className="txt_field">
          <textarea type="text" name="description" autoComplete="off" onChange={handleChange}/>
          <span></span>
          <label>Description</label>
        </div>
        <div className="upload">
            <input type='file' onChange={submitImage}/>
            {imgurl?(<p>Image is uploaded</p>):(<p>Wait for Image upload</p>)}
        </div>
        <input type='submit'/>
       </form>
       </div>   
  )
}

export default Addproduct