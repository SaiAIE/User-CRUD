import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import {Form,Table,Button} from "react-bootstrap"

const Home = () => {
    const [users,setUsers] = useState([])
    const [search,setSearch] = useState("")
    const [filteredUsers,setFilteredUsers] = useState([])

    const API=import.meta.env.VITE_API
    useEffect(()=>{
        axios.get(`${API}/api/users`)
        .then((res)=>setUsers(res.data.details))
        .catch((err)=>console.log(err))
    },[])

    const deleteUser = (id)=>{
        if(window.confirm("Are You Sure?")){
            axios.delete(`${API}/api/users/${id}`)
            .then(()=>setUsers(users.filter((user)=>user._id !== id)))
            .catch((err)=>console.log(err))
        }
    }

    useEffect(()=>{
        if(search.trim() === ""){
            setFilteredUsers(users)
        } else{
            setFilteredUsers(users.filter((user)=>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            (user.phone && user.phone.includes(search) ||
            user.age.toString().includes(search)
)))
        }
    },[search,users])

  return (
    <div className='d-flex justify-content-center flex-column align-items-center text-center '>
        <Form.Control
        type="text"
        placeholder="Search by Name, Email, Phone, or Age..."
        className="mb-3 border border-2 text-center border-primary rounded-pill searchbar"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
      <div className='table-responsive'>
      <Table striped bordered hover>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers.length > 0 ? (filteredUsers.slice().reverse().map((user)=>(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>
                    <Link to={`/edit/${user._id}`} className="btn btn-warning mx-2">Edit</Link>
                    <Button variant='danger' onClick={()=>deleteUser(user._id)}>Delete</Button>
                    </td>
                </tr>))):(
                    <tr>
                        <td colSpan="5" className='text-center'>No users Found</td>
                    </tr>
            )}
        </tbody>
      </Table>
      </div>
      <Link to="/add" className='btn btn-primary mb-3'>Add User</Link>

    </div>
  )
}

export default Home
