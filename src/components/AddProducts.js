import React ,{useState}from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';

export default function AddProducts() {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await fetch('http://localhost:5000/products', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }, 
  //       body: JSON.stringify(data),
  //     });
     
  //     const responseData = await response.json();
  //     // reset();
  //     if (responseData.success) {
  //       // reset();
  //       toast.success('Added in Successfully');
  //     } else {
  //       alert(responseData.message); // Alert on unsuccessful login
  //     }
  //   } catch (error) {
  //     toast.error('failed');
  //     console.error('Failed to add product:', error);
  //   }
  // };
   
  const [product, setproduct] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

const onSubmit = async data=> {
  try{
  

    const res = await axios.post('http://localhost:5000/api/products',data);
   
    if(res.status === 200){
      toast.success('added');
      setShow(true)
      
     }
reset()
  
  }
  catch(err){
   if(err.response && err.response.status === 400){
    toast.error('failed');
   }
    toast.error(err.response.data)
  }

  // methods.reset()
};

  return (
    <>
   <NavBar/>

<form onSubmit={handleSubmit(onSubmit)} className="mt-9 max-w-md mx-auto">
  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="relative z-0 w-full mb-5 group">
  
  <input type="text" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' id="productName" {...register('productName', { required: true })}  placeholder=" "  />
          {errors.productName && <p>This field is required</p>}      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
  </div>

  {/* <div className="relative z-0 w-full mb-5 group">
  <input type="text" id="shortDescription" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' {...register('shortDescription', { required: true })}  placeholder=" "  />
          {errors.shortDescription && <p>This field is required</p>}  
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Short Description</label>
          </div> */}

          <div className="relative z-0 w-full mb-5 group">
  <input type="text" id="description" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' {...register('description', { required: true })}  placeholder=" "   />
          {errors.description && <p>This field is required</p>}  
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
          </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
          <label className="sr-only ">Underline select</label>
  <select id='category' className="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent  border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" {...register("category", { required: true })}>
      <option value=''>Choose a Category</option>
      <option value="Phones">Phones</option>
      <option value="Cars">Cars</option>
      <option value="Paintings">Paintings</option>
      <option value="Others">Others</option>
  </select>
  {errors.category && <p>This field is required</p>} 
          </div>
 
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input id='startingPrice'  className="block  text-decoration-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " type="number" {...register("startingPrice", {required: true})}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Starting Price</label>
        {errors.startingPrice && <p>This field is required</p>} 
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input id='bidenddate' type="date"  className="block  text-decoration-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("bidenddate", {required: true})}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bidenddate</label>
        {errors.bidenddate && <p>This field is required</p>} 
    </div>
   </div>
   <div className="grid md:grid-cols-2 md:gap-6" >
  <div className="relative z-0 w-full mb-5 group">
  
  <input type="text" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' id="name" {...register('name', { required: true })}  placeholder=""  />
          {errors.name && <p>This field is required</p>}      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
  
  <input type="text" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' id="address" {...register('address', { required: true })}  placeholder=" "  />
          {errors.address && <p>This field is required</p>}      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
  </div>
   </div>
   <div className="grid md:grid-cols-3 md:gap-6">
   <div className="relative z-0 w-full mb-5 group">
  
  <input type="text" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' id="city" {...register('city', { required: true })}  placeholder=" "  />
          {errors.city && <p>This field is required</p>}      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
  
  <input type="text" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' id="state" {...register('state', { required: true })}  placeholder=" "  />
          {errors.state && <p>This field is required</p>}      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
  
  <input type="number" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' id="pincode" {...register('pincode', { required: true })}  placeholder=" "  />
          {errors.pincode && <p>This field is required</p>}      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pincode</label>
  </div>

   </div>
   <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
  
  <input type="text" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' id="phoneNumber" {...register('phoneNumber', { required: true })}  placeholder=" "  />
          {errors.phoneNumber && <p>This field is required</p>}      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
        <input type='email' id='email'  className="block  text-decoration-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  {...register("email", { pattern: /^\S+@\S+$/i, required: true})}/>
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        {errors.email && <p>This field is required</p>} 
    </div>
    </div>
    <input disabled value={product} />
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Product Added Successfully!</Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" onClick={handleClose}>
           Add More Products
          </Button>
        </Modal.Footer>
      </Modal>
<ToastContainer/>
    </>
  );
}