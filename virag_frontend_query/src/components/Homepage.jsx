import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'

export const Homepage = () => {
    const navigate = useNavigate()
  return (
      <div id="nyito">
        <Header/>
          <main onClick={()=>navigate('/flowers')}>
              <a href="#">Válasszon vetőmagjainkból!</a>
          </main>
        <Footer/>
          
      </div>
  )
}

