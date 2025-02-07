import React from 'react'
import { useEffect } from 'react'
import { getData, uploadData } from '../utilities'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const AddNew = () => {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const url = 'http://localhost:8000/api/categories'
    const { handleSubmit, register } = useForm();

    useEffect(() => {
        getData(url, setCategories)
    }, [])

    const onSubmit = async (data) => {
        let newPost = {
            ...data
        }

        uploadData('http://localhost:8000/api/property', newPost)
    }

    return (
        <div class="container">
            <div class="container-newad">
                <h2 class="form-title">Új hirdetés elküldése</h2>
                <a href="#" onClick={() => navigate('/')}><i class="fa-solid fa-house"></i></a>
                <div class="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-group">
                            <label for="category" class="form-label">Ingatlan kategóriája</label>
                            <select {...register("kategoriaId", { required: true })} class="form-select">
                                <option value="0">Kérem válasszon</option>
                                {categories && categories.map(category =>
                                    <option key={category.id} value={category.id}>{category.nev}</option>
                                )}
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="date" class="form-label">Hirdetés dátuma</label>
                            <input {...register('hirdetesDatuma', { required: true })} type="date" class="form-control" id="date" />
                        </div>

                        <div class="form-group">
                            <label for="description" class="form-label">Ingatlan leírása</label>
                            <textarea {...register('leiras', { required: true })} class="form-control" id="description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="photo" class="form-label">A fotó URL-je:</label>
                            <input {...register('kepUrl', { required: true })} type="text" class="form-control" id="photo" />
                        </div>

                        <div class="form-group form-check">
                            <input {...register('tehermentes', { required: true })} class="form-check-input" type="checkbox" id="creditFree" checked />
                            <label class="form-check-label" for="creditFree">Tehermentes ingatlan</label>
                        </div>

                        <div class="form-group text-center">
                            <button class="btn">Küldés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

