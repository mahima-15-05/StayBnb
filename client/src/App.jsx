import { useState } from 'react'

import './App.css'
import Login from './Pages/Login'
import Home from './Pages/Home'
import {Routes, Route} from 'react-router-dom';

function App() {
  

  return (
    <>
    
    <Routes>

      <Route path="/"  element={<Login/>}/>
      <Route path="/home"  element={<Home/>}/>
      {/* <Route path="/register"  element={<Login/>}/> */}
    </Routes>
    
      
    </>
  )
}

export default App
