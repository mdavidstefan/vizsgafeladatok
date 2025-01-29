import React from 'react'
import { Header } from './Header'
import { useState } from 'react'
import { useEffect } from 'react'
import { getData } from '../utility'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'

const url = "http://localhost:8000/api/flowers"

export const Flowers = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getData(url, setProducts)
    }, [])

    products && console.log(products);

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    {products && products.map(product => 
                        <div key={product.id} className='col-lg-4 mt-4 arukep'>
                            <h4>{product.nev}</h4>
                            <a onClick={()=>navigate('/order/' + product.id)}href="#"><img src={product.kepUrl} alt={product.nev} className='img-fluid' /></a>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

