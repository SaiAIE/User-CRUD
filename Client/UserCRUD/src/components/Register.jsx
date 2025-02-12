import React,{useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()
    const [islogin, setIsLogin] = useState(true)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const API=import.meta.env.VITE_API

    const handleToggle = () =>setIsLogin(!islogin)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            if(!islogin){
                const res = await axios.post(`${API}/api/users/login`,{email,password})
                localStorage.setItem('token',res.data.token)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                alert('Login Successfull')
                navigate("/")
            } else{
                await axios.post(`${API}/api/users/register`,{email,password})
                alert("Registration Successfull")
                setIsLogin(false)
            }
        } catch(error){
            alert(error.response?.data?.message || 'Something went wrong')
        }
    }
  return (
    <div className='container mt-5 d-flex flex-column justify-content-center align-items-center ' style={{height:"400px"}} >
      <div className='row justfiy-content-evenly align-items-center text-center d-flex border p-2 h-100'>
        <div className='col-md-4 d-flex w-100 flex-column justify-content-center align-items-center gap-10'>
            <h3 className='text-decoration-underline mb-4'>
                {islogin ? 'Register:':'Login:'}
            </h3>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder='Enter Email...' onChange={(e)=>setEmail(e.target.value)} required className='form-control mb-3'/>
                <input type="password" value={password} placeholder='Enter Password...' onChange={(e)=>setPassword(e.target.value)} required className='form-control mb-3' />
                <button type='submit' className="btn btn-primary w-100">
                    {islogin ? 'Register' : 'Login'}
                </button>
            </form>
            <button onClick={handleToggle} className='btn btn-link mt-3 w-100'>
                {islogin?"Already have an account? Login" : "New User? Create an account"  }
            </button>
        </div>
      </div>
    </div>
  )
}

export default Register
