import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './assets/Pages/Signup'
import { Signin } from './assets/Pages/Signin'
import { Dashboard } from './assets/Pages/Dashboard'
import { Send } from './assets/Pages/Send'
import { AuthProvider, useAuth } from './assets/Components/AuthContext'
import { PrivateRoute } from './assets/Components/PrivateRoute'

function App() {
  const {isLoading} = useAuth();

  if (isLoading) {
    return <div>Loading....</div>
  }
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
      <Route path= '/Send' element={<PrivateRoute><Send/></PrivateRoute>}></Route>

    </Routes>
    </BrowserRouter>

  )

}

export default App;