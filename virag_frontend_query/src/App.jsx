import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Homepage } from './components/Homepage'
import { Flowers } from './components/Flowers'
import {Order} from './components/Order'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/flowers', element: <Flowers /> },
  { path: '/order/:id', element: <Order /> }
])

function App() {


  return <RouterProvider router={router} />
}

export default App
