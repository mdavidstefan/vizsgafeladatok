import express, { response } from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { configDB } from './configDB.js';
const PORT = 8000;

let connection
try {
    connection = await mysql.createConnection(configDB)
} catch (error) {
    console.log(error);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/flowers', async (req, response) => {
    try {
        const sql = "select aruk.id, aruk.nev, aruk.leiras, aruk.keszlet, aruk.ar, aruk.kepUrl, kategoriak.nev as 'kategoria' from aruk, kategoriak WHERE aruk.kategoriaId = kategoriak.id order by id"
        const [rows, fields] = await connection.query(sql)
        response.status(200).send(rows)
    } catch (error) {
        console.log(error);
    }
})

app.get('/api/flowers/:id', async (req, response) => {
    const { id } = req.params
    console.log(id);
    try {
        const sql = "select aruk.id, aruk.nev, aruk.leiras, aruk.keszlet, aruk.ar, aruk.kepUrl, kategoriak.nev as 'kategoria' from aruk, kategoriak WHERE aruk.kategoriaId = kategoriak.id AND aruk.id = ?"
        const values = [id]
        const [rows, fields] = await connection.query(sql, values)
        rows.length == 0 ? response.status(404).json({ msg: "A virág nem található " }) : response.status(200).send(rows)
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/flowers', async (req, response) => {
    const { nev, kategoriaId, leiras, kepUrl, ar, keszlet } = req.body //mindegy a sorrend
    try {
        const sql = "insert into aruk values (?, ?, ?, ?, ?, ?, ?)"
        const values = [null, nev, kategoriaId, leiras, keszlet, ar, kepUrl] //fontos a sorrend
        const [rows, fields] = await connection.query(sql, values)
        response.status(201).json({ msg: "Sikeres hozzáadása!" })
    } catch (error) {
        console.log(error);
    }
})

app.put('/api/flowers/:id', async (req, response) => {
    const { id } = req.params
    const { nev, leiras, keszlet, ar } = req.body
    try {
        const sql = "update aruk set nev = ?, leiras = ?, keszlet = ?, ar = ? where id = ?"
        const values = [nev, leiras, keszlet, ar, id]
        const [rows, fields] = await connection.query(sql, values)
        rows.affectedRows == 0 ? response.status(404).json({ msg: "Az adott azonosítóval nem található termék!" }) : response.status(200).json({ msg: "Sikeres módosítás!" })
    } catch (error) {
        console.log(error);
    }
})

app.delete('/api/flowers/:id', async (req, response) => {
    const { id } = req.params
    try {
        const sql = "delete from aruk where id = ?"
        const values = [id]
        const [rows, fields] = await connection.query(sql, values)
        rows.affectedRows == 0 ? response.status(404).json({ msg: "A virág nem található" }) : response.status(200).json({ msg: "Sikeres törlés!" })
    } catch (error) {
        console.log(error);
    }
})

app.get('/api/categories', async (req, response) => {
    try {
        const sql = "select * from kategoriak"
        const [rows, fields] = await connection.query(sql)
        response.status(200).send(rows)
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => console.log(`server listening on port : ${PORT}`));