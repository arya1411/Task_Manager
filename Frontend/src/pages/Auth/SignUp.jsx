import React, { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [profilePic , setProfilePic] = useState(null);
  const [fullName , setFullName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword]  = useState("");
  const [adminInviteToken , setAdminInviteToken] = useState("");
  
  const [error, setError] = useState(null);
 
   const handleSignUp = async (e) =>{
     e.preventDefault();


     if(!fullName){
      setError("Please Enter Full Name");
      return ;
     }
 
     if(!validateEmail(email)){
       setError("Please Enter A Valid Email Address")
        return ;
      }
 
     if(!password){
       setError("Please Enter the password")
      return ; 
      }
 
     setError("")
    }
     
     
     
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join Us Today by Entering Your Details below
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image = {profilePic} setImage={setProfilePic} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder="Arya"
            type='text'
            />
          
            <Input
            value={email}
            onChange={({target}) => setFullName(target.value)}
            label="Email Addreess"
            placeholder="Email"
            type='text'
            />
          
            <Input
            value={password}
            onChange={({target}) => setFullName(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type='text'
            />
          
            <Input
            value={password}
            onChange={({target}) => setFullName(target.value)}
            label="Admin Invite Token"
            placeholder="6 Digit Code"
            type='text'
            />
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='sumbit' className='btn-primary'>
          SignUp
        </button>
        <p className="text-[13px] text-slate-800 mt-3">
        Already have An Account`?{""}
        <Link className='font-medium text-primary underline' to="/login">Login</Link>
        </p>
          </form>  
      </div>
    </AuthLayout>
  )
}

export default SignUp