import React from 'react'
import { Header } from './Header'
import { getData } from '../utility'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const url = "http://localhost:8000/api/flowers"

export const Flowers = () => {
    const { data, isLoading, isError, error } = useQuery({ queryKey: ['products', url], queryFn: getData })
    const navigate = useNavigate()
    if (isLoading) return <div>loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    data && console.log(data);

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    {data && data.map(product =>
                        <div key={product.id} className='col-lg-4 mt-4 arukep'>
                            <h4>{product.nev}</h4>
                            <a onClick={() => navigate('/order/' + product.id)} href="#"><img src={product.kepUrl} alt={product.nev} className='img-fluid' /></a>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

