import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

// styles 
import './App.scss'



const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/dashboard" exact component={Dashboard} />
      </BrowserRouter>
    </div>
  )
}

export default App
