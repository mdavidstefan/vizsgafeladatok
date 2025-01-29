import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleData } from '../utility'
import { Header } from './Header'
import { Footer } from './Footer'
import { useState } from 'react'

const url = "http://localhost:8000/api/flowers/"

export const Order = () => {
    const [product, setProduct] = useState(null)
    const [db, setDb] = useState(1)
    const { id } = useParams()
    console.log(id);
    const navigate = useNavigate()

    useEffect(() => {
        getSingleData(url + id, setProduct)
    }, [])

    product && console.log(product[0]);

    const handleOrder = (e) => {
        e.preventDefault;
        console.log(db);
        if (product.keszlet < db) {
            alert('Nincs ennyi mennyiség raktáron!')
            navigate('/flowers')
        } else {
            //backend
            alert('sikeres rendelés!')
            navigate('/flowers')
        }
    }

    return (
        <>
            <Header />
            {product &&
                <main className="container">
                    <h2>{product.nev}</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={product.kepUrl} alt={product.nev} className="img-thumbnail" />
                        </div>
                        <div className="col-md-6">
                            <p>{product.leiras} </p>
                            <form>
                                <p className="text-center"><span id="ar">Ár: {product.ar} Ft</span>
                                    <label for="mennyiseg">Mennyiség:</label>
                                    <input type="number" name="mennyiseg" id="mennyiseg" min="1" max="999" value={db} onChange={(e) => setDb(e.target.value)} />
                                </p>
                                <p className="text-center"><button onClick={handleOrder} className="btn btn-warning btn-lg">Megrendelem</button></p>
                            </form>
                        </div>
                    </div>

                </main>
            }
            <Footer />
        </>
    )
}

export default Order
