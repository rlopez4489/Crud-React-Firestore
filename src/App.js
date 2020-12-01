import React from 'react'
import './App.css';
import Links from './Components/Links'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="container mx-auto mt-3">
        <Links />
        <ToastContainer />
    </div>
  )
}

export default App;
