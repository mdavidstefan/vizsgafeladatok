import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleData, updateData } from '../utility'
import { Header } from './Header'
import { Footer } from './Footer'

const url = "http://localhost:8000/api/flowers/"

export const Order = () => {
    const [product, setProduct] = useState(null)
    const [db, setDb] = useState(0)
    const [msg, setMsg] = useState(null)
    const { id } = useParams()
    console.log(id);
    const navigate = useNavigate()

    useEffect(() => {
        getSingleData(url + id,  setProduct)
    }, [])

    useEffect(() => {
        if (product && product.keszlet > 0) setDb(1)
    }, [product])

    useEffect(() => {
        if (msg) {
            alert(msg?.msg)
            navigate('/flowers')
        }
    }, [msg])

    product && console.log(product);

    const handleOrder = (e) => {
        e.preventDefault;
        console.log(db);
        if (product.keszlet < db) {
            alert('Nincs ennyi mennyiség raktáron!')
            navigate('/flowers')
        } else {
            const updatedProduct = { ...product, keszlet: product.keszlet - db }
            updateData(url + product.id, updatedProduct, setMsg)
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
                            {db > 0 &&
                                <form>
                                    <p className="text-center"><span id="ar">Ár: {product.ar} Ft</span>
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
