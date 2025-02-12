import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate,useParams } from 'react-router-dom'
import {Form,Button} from "react-bootstrap"

const EditUser = () => {
    const [user,setUser] = useState({name:"",email:"",phone:"",age:"",gender:""})
    console.log(user)
    const {id} = useParams()
    const navigate = useNavigate()

    const API=import.meta.env.VITE_API

    useEffect(()=>{
        axios.get(`${API}/api/users/${id}`)
        .then((res)=>setUser(res.data.details))
        .catch((err)=>console.log(err))
    },[id])

    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.put(`${API}/api/users/${id}`,user)
        .then(()=>navigate('/'))
        .catch((err)=>console.log(err))
    }

  return (
    <div className='edituser d-flex justify-content-center flex-column align-items-center'>
      <h3 className='text-decoration-underline'>Edit User:</h3>
      <Form onSubmit={handleSubmit} className='d-flex justify-content-center flex-column align-items-center p-2'>
        <Form.Group className='p-2'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" value={user.name} onChange={handleChange} />
                </Form.Group>
        <Form.Group className='p-2'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
                </Form.Group>
        <Form.Group className='p-2'>
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control type="number" name="phone" value={user.phone} onChange={handleChange} />
                </Form.Group>
        <Form.Group className='p-2'>
                    <Form.Label>Age:</Form.Label>
                    <Form.Control type="number" name="age" value={user.age} onChange={handleChange} />
                </Form.Group>
                <Form.Group className='p-2'>
                    <Form.Label>Gender:</Form.Label>
                     <Form.Control as="select" name="gender" value={user.gender || ""} onChange={handleChange} >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </Form.Control>
                </Form.Group>
                <Button type="submit" className='mt-3'>Update User</Button>
      </Form>
    </div>
  )
}

export default EditUser
