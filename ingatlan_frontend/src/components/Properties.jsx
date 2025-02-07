import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../utilities'
import { useState } from 'react'

const url = 'http://localhost:8000/api/property'

export const Properties = () => {
    const [ingatlanok, setIngatlanok] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getData(url, setIngatlanok)
    }, [])

    ingatlanok && console.log(ingatlanok);

    return (
        <>
            <div className="container-l">
                <a href="#" onClick={() => navigate('/')}><i className="fa-solid fa-house"></i></a>
                <h2 className="section-title">Aktuális ajánlataink</h2>

                <div className="listings-container">
                    {ingatlanok && ingatlanok.map(ingatlan =>
                        <div key={ingatlan.id} className="listing-card">
                            <div className="card-header">
                                <span className="title">{ingatlan.kategNev}</span>
                                <span className="date">{ingatlan.hirdetesDatuma.split("T")[0]}</span>
                            </div>
                            <img className="card-image"
                                src={ingatlan.kepUrl}
                                alt={ingatlan.kategNev} />
                            <div className="card-footer">
                                <button className="btn " popovertarget="contactFormPopup" onClick={()=> navigate('/property/' + ingatlan.id)}>Részletek</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

