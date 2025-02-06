import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home'
import { Properties } from './components/Properties'
import { Property } from './components/Property'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/properties', element: <Properties /> },
  { path: '/property', element: <Property />}
])


function App() {

  return <RouterProvider router={router} />
}

export default App
