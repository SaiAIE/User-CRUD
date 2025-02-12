import React, { useEffect, useState } from 'react'
import { HashRouter as Router,Route,Routes,useNavigate } from 'react-router-dom'
import Home from "./components/Home"
import AddUser from "./components/AddUser"
import EditUser from './components/EditUser'
import Register from './components/Register'
import "./App.css"
import {  } from 'react-router-dom'

const isAuthenticated = ()=>{
  return localStorage.getItem("token")
}
const ProtectedRoute = ({element})=>{
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isAuthenticated()){
      alert("Login First: The Routes are Protected 🛡️🛡️🛡️🛡️🛡️")
      navigate("/register")
    }
  },[])
  return element
}

const App = () => {

  return (
    <Router>
      <div className='container mt-4 position-relative'>
        <h2 className='text-center text-decoration-underline mb-4'>User Management System</h2>
        <Routes>
          <Route path='/' element={<ProtectedRoute element={<Home/>}/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path='/add' element={<ProtectedRoute element={<AddUser/>}/>}></Route>
          <Route path='/edit/:id' element={<ProtectedRoute element={<EditUser/>}/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
