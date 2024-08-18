import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/FirebaseProvider";
import Swal from "sweetalert2";



const Register = () => {

  const {RegisterUser,updateUserProfile}=useContext(AuthContext);
  const [error,setError]=useState('')
  const [showPassword,setShowPassword] =useState(false);
  const navigate =useNavigate();
  const location =useLocation();
  const from= location?.state || "/";
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const {Email,Password,FullName,Image}=data
    if(Password.length<6){
      setError('Password must be 6 character')
      return
    }
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
    if(!regex.test(Password)){
      setError( 'Must be  included atleast   one Uppercase & Lowercase Letter')
      return
    }
    RegisterUser(Email,Password)
    .then(result=>{
      updateUserProfile(FullName,Image)
      
      .then(()=>{

      })
      console.log(result.user);
      navigate(from);  
    

      Swal.fire({
        title: 'User SignUp Successful.',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
    })
    .catch(error =>{
			
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "SignUp Failed",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
    // console.log(Email,Password);
  };
  
  
  
  return (
    <div className="w-4/5 max-w-md mt-20 mx-auto mb-20  rounded-lg shadow-xl p-8 dark:bg-slate-300 dark:text-gray-800">
    <form onSubmit={handleSubmit(onSubmit)}  className="space-y-8">
     <div className="space-y-4">
       
     <div className="space-y-2">
         <label name="name" className="block text-sm">Name</label>
         <input type="text" name="Name"  placeholder="Name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" 
         {...register("FullName", { required: true })}
       
         />
           
       </div>
       {errors.FullName && <span className="text-red-600">This field is required</span>}
       <div className="space-y-2">
         <label name="image" className="block text-sm">Image</label>
         <input type="text" name="image" id="email" placeholder="Imagae URL" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
         {...register("Image", { required: true })}
         />
       </div>
       
       {errors.Image && <span className="text-red-600">This field is required</span>}

       <div className="space-y-2">
         <label name="email" className="block text-sm">Email address</label>
         <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" 
             {...register("Email", { required: true })}
         />
            {errors.Email && <span className="text-red-600">This field is required</span>}

       </div>
       <div className="space-y-2">
         <div className="flex justify-between">
           <label name="password" className="text-sm">Password</label>
           {/* <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a> */}
         </div>
       <div className="flex  items-center relative">
       <input 
       type={showPassword ? 'text' : 'password' } 
       name="password" 
       id="password" 
       placeholder="*****" 
       className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
         {...register("Password", { required: true })}
       
         />
           <span  onClick={()=> setShowPassword(!showPassword)}   className="absolute right-2">
            {
              showPassword ? <FaRegEyeSlash /> : <FaEye />
            }

           </span>
       </div>
          
       </div>
      
       {errors.Password && <span className="text-red-600">This field is required</span>}
       {
        error && <small className="text-red-600">{error}</small>
       }
     </div>
     <button className='p-4 bg-blue-400 rounded-lg w-full text-white'>Sign UP</button>
     <p className="text-sm text-center dark:text-gray-600">Already have an account?
  <Link to='/login'><a href="#" rel="noopener noreferrer" className="focus:underline hover:underline text-blue-400">Please Log In</a></Link>
</p>
   </form>
  
 </div>
  );
};

export default Register;