import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Property = () => {

    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="container-newad">
                <h2 className="form-title">Új hirdetés elküldése</h2>
                <a href="#" onClick={() => navigate('/')}><i className="fa-solid fa-house"></i></a>
                <div className="form-container">
                    <div className="form-group">
                        <label for="category" className="form-label">Ingatlan kategóriája</label>
                        <select className="form-select">
                            <option value="0">Kérem válasszon</option>
                            <option value="1">Ház</option>
                            <option value="2">Lakás</option>
                            <option value="3">Építési telek</option>
                            <option value="4">Garázs</option>
                            <option value="5">Mezőgazdasági terület</option>
                            <option value="6">Ipari ingatlan</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label for="date" className="form-label">Hirdetés dátuma</label>
                        <input type="date" className="form-control" id="date" />
                    </div>

                    <div className="form-group">
                        <label for="description" className="form-label">Ingatlan leírása</label>
                        <textarea className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label for="photo" className="form-label">A fotó URL-je:</label>
                        <input type="text" className="form-control" id="photo" />
                    </div>

                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" id="creditFree" checked />
                        <label className="form-check-label" for="creditFree">Tehermentes ingatlan</label>
                    </div>

                    <div className="form-group text-center">
                        <button className="btn">Küldés</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

