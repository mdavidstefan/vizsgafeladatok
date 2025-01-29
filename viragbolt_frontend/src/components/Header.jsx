import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate()
    return (
        <header>
            <a onClick={()=>navigate('/')}href="#"><img src="./sunflower.jpg" alt="fa" id="logo" /></a>
            <h1>Nevenincs Bt.</h1>
            <h2>Vetőmagok - Mindenféle, minden mennyiségben</h2>
        </header>
    )
}

