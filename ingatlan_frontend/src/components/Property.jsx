import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleData } from '../utilities'
import { useState } from 'react'

const url = 'http://localhost:8000/api/property/'

export const Property = () => {

    const [property, setProperty] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getSingleData(url + id, setProperty)
    }, [])

    return (
        <div className="container-l">
            <a href="#" onClick={() => navigate('/')}><i className="fa-solid fa-house"></i></a>
            {property &&
                <div className="propertyDetails">
                    <h2>{property.kategNev}</h2>
                    <img src={property.kepUrl} alt={property.kategNev} className='propertyImg' />
                    <p>{property.leiras}</p>
                    <h2>Ára: {property.ar} Ft</h2>
                    <button className="btn" onClick={() => navigate('/properties')}>Vissza a többi hirdetéshez...</button>
                </div>
            }
        </div>
    )
}

