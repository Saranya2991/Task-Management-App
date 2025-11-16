import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    const initialformData ={name:"", email:"", password:"" };
    const [formData, setformData] = useState(initialformData);
    const [formError, setformError] = useState({});
    const [isSubmit, setisSubmit] = useState(false);


const handleFormDataChange = (key, value) => {
    setformData({...formData,  [key]: value,})           
 }

const handleSubmit = (e) => {
  e.preventDefault();
  setformError(validate(formData)); 
  setisSubmit(true);
   
};

useEffect(() => {
    if(Object.keys(formError).length === 0 && isSubmit) {
        console.log(formData);
        navigate("/Dashboard");
        setisSubmit(false);
    }
}, [formError, isSubmit, navigate]);

const validate =(values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!values.name.trim()){
        errors.name = "Name is Required!"
    }
    if (!values.email.trim()){
        errors.email = "Email is Required!"
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format!";
    }

    if (!values.password){
        errors.password = "Password is Required!"
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
};

    return(
        <>
        <div className="p-8 mx-auto max-w-xl shadow-lg mt-20 rounded-lg">
        <h1 className='text-3xl text-center font-bold mb-4'>Login</h1>
        <form className='border rounded-lg p-6' onSubmit={handleSubmit}>
        <input className='w-full p-2 border rounded mb-3' type="text" placeholder='Enter Your Name' 
            onChange = {(e) => {
            const {value} = e.target;
            handleFormDataChange("name", value);
        }} value = {formData.name}>
       </input>
       {formError.name && <p className='text-red-500'>{formError.name}</p>}
        <input className='w-full p-2 border rounded mb-3' type="email" placeholder='Enter Your Email'  
            onChange = {(e) => {
            const {value} = e.target;
            handleFormDataChange("email", value);
        }} value = {formData.email}>
        </input>
        {formError.email && <p className='text-red-500'>{formError.email}</p>}
        <input className='w-full p-2 border rounded mb-3' type="password" placeholder='Enter Your Password'  
            onChange = {(e) => {
            const {value} = e.target;
            handleFormDataChange("password", value);
        }} value = {formData.password}>
        </input>
         {formError.password && <p className='text-red-500'>{formError.password}</p>}

        
        <button className='p-2 bg-blue-500 text-white px-4 py-2 ml-48 rounded-3xl mt-3' type ="submit">
            Submit
        </button>
        </form>
        </div>
      
        </>
    )
}

export default Home