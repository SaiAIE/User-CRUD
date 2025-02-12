import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"
import {Form,Table,Button} from "react-bootstrap"

const Home = () => {
    const [users,setUsers] = useState([])
    const [search,setSearch] = useState("")
    const [loading,setLoading] = useState(true)
    const [filteredUsers,setFilteredUsers] = useState([])
    const navigate = useNavigate()

    const [user,setUser]=useState([])
    
      useEffect(()=>{
        const loggeduser=JSON.parse(localStorage.getItem("user"))
        setUser(loggeduser)
      },[])
    
      const email = user?.email || ""
      const usern = email.split(/[\.@]/)[0]
      const username = usern.charAt(0).toUpperCase() + usern.slice(1).toLowerCase()

    const API=import.meta.env.VITE_API

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            navigate("/register")
        }
    },[navigate])
    
    useEffect(()=>{
        const token = localStorage.getItem("token")
        setLoading(true)
        axios.get(`${API}/api/users`,{
            headers:{Authorization: `Bearer ${token}`}
        })
        .then((res)=>{setUsers(res.data.details);setFilteredUsers(res.data.details);setLoading(false)})
        .catch((err)=>{console.log(err),setLoading(false)})
    },[])

    const logout = ()=>{
        localStorage.removeItem("token")
        navigate('/register')
    }

    const deleteUser = (id)=>{
        const token = localStorage.getItem("token")
        if(window.confirm("Are You Sure?")){
            axios.delete(`${API}/api/users/${id}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            .then(()=>{
                const updatedUsers = users.filter((user)=>user._id !==id)
                setUsers(updatedUsers)
                setFilteredUsers(updatedUsers)
            
        }).catch((err)=>console.log(err))
    }
    }

    useEffect(()=>{
        if(search.trim() === ""){
            setFilteredUsers(users)
        } else{
            setFilteredUsers(users.filter((user)=>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.gender.toLowerCase().includes(search.toLowerCase())||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            (user.phone && user.phone.includes(search) ||
            user.age.toString().includes(search)
)))
        }
    },[search,users])

  return (
    <div className='d-flex justify-content-center flex-column align-items-center text-center position-relative'>
        <h3 className='text-center m-3'> ✨Hello <strong className='text-decoration-underline'>{username}</strong>✨</h3>
        <Form.Control
        type="text"
        placeholder="Search by Name, Email, Phone, or Age..."
        className="mb-3 border border-2 text-center border-primary rounded-pill searchbar"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
      <div className='table-responsive'>
        {loading ? (
            <div className='d-flex justify-content-center align-items-center' style={{minHeight:"50vh"}}>
                <div className='spinner-border text-primary' role="status">
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        ):(
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
                </tr>
                ))):(
                    <tr>
                        <td colSpan="6" className='text-center'>No users Found</td>
                    </tr>
            )}
        </tbody>
      </Table>
        )}
      </div>
      <Link to="/add" className='btn btn-primary mb-3'>Add User</Link>
      <Button className='position-absolute top-0 end-0' onClick={logout} ><i class="fa-solid fa-arrow-right-from-bracket"></i></Button>
    </div>
  )
}

export default Home
