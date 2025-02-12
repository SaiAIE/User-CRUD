import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from "./components/Home"
import AddUser from "./components/AddUser"
import EditUser from './components/EditUser'
import "./App.css"

const App = () => {
  return (
    <Router>
      <div className='container mt-5'>
        <h2 className='text-center text-decoration-underline mb-4'>User Management System</h2>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/add' element={<AddUser/>}></Route>
          <Route path='/edit/:id' element={<EditUser/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
