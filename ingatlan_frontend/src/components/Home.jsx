import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate()

    return (
        <div className="container">
            <a href="#" onClick={() => navigate('/')}><i className="fa-solid fa-house"></i></a>
            <h1 className="title">Ingatlanügynökség</h1>
            <div className="button-container">
                <a href="#" onClick={() => navigate('/properties')}><button className="btn">Nézze meg kínálatunkat!</button></a>
                <a href="#" onClick={() => navigate('/addlisting')}><button className="btn">Hirdessen nálunk!</button></a>
            </div>
        </div>
    )
}

