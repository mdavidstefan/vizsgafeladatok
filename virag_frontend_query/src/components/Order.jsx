import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, updateData } from '../utility'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'

const url = "http://localhost:8000/api/flowers/"

export const Order = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useQuery({ queryKey: ['product', url + id], queryFn: getData })
    const [db, setDb] = useState(1)

    const navigate = useNavigate()

    if (isLoading) return <div>loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    const handleOrder = (e) => {
        e.preventDefault;
        console.log(db);
        if (data[0].keszlet < db) {
            alert('Nincs ennyi mennyiség raktáron!')
            navigate('/flowers')
        } else {
            const updatedProduct = { ...data[0], keszlet: data[0].keszlet - db }
            updateData(url + data[0].id, updatedProduct)
            alert('sikeres rendelés')
            navigate('/flowers')
        }
    }

    return (
        <>
            <Header />
            {data[0] &&
                <main className="container">
                    <h2>{data[0].nev}</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={data[0].kepUrl} alt={data[0].nev} className="img-thumbnail" />
                        </div>
                        <div className="col-md-6">
                            <p>{data[0].leiras} </p>
                            {data[0].keszlet > 0 &&
                                <form>
                                    <p className="text-center"><span id="ar">Ár: {data[0].ar} Ft</span>
                                        <label for="mennyiseg">Mennyiség:</label>
                                        <input type="number" name="mennyiseg" id="mennyiseg" min="1" max="999" value={db} onChange={(e) => setDb(e.target.value)} />
                                    </p>
                                    <p className="text-center"><button onClick={handleOrder} className="btn btn-warning btn-lg">Megrendelem</button></p>
                                </form>
                            }
                        </div>
                    </div>

                </main>
            }
            <Footer />
        </>
    )
}

export default Order
