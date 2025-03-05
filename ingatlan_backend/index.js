import express, { response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { configDB } from "./configDB.js";
const PORT = 8000;

let connection;
try {
  connection = await mysql.createConnection(configDB);
} catch (error) {
  console.log(error);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/property", async (request, response) => {
  try {
    const sql =
      "select ingatlanok.id, leiras, hirdetesDatuma, tehermentes, ar, kepUrl, kategoriak.nev as kategNev from ingatlanok join kategoriak on ingatlanok.kategoriaId = kategoriak.id order by ingatlanok.id";
    const [rows, fields] = await connection.query(sql);
    response.status(200).send(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/property/from/:fromDate", async (request, response) => {
  const { fromDate } = request.params;
  try {
    const sql =
      "select ingatlanok.id, ingatlanok.leiras, ingatlanok.hirdetesDatuma, ingatlanok.tehermentes, ingatlanok.ar, ingatlanok.kepUrl, kategoriak.nev from ingatlanok where ingatlanok.kategoriaId = kategoriak.id and ingatlanok.hirdetesDatuma > ? order by ingatlanok.hirdetesDatuma desc";
    const [rows, fields] = await connection.query(sql, [fromDate]);
    rows.length == 0
      ? response.status(404).json({ msg: "Az ingatlan nem található " })
      : response.status(200).send(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/property/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const sql =
      "select ingatlanok.id, leiras, hirdetesDatuma, tehermentes, ar, kepUrl, kategoriak.nev as kategNev from ingatlanok join kategoriak on ingatlanok.kategoriaId = kategoriak.id where ingatlanok.id = ? order by ingatlanok.id";
    const values = [id];
    const [rows, fields] = await connection.query(sql, values);
    rows.length == 0
      ? response.status(404).json({ msg: "Az ingatlan nem található " })
      : response.status(200).send(rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/property", async (request, response) => {
  const { kategoriaId, leiras, hirdetesDatuma, tehermentes, ar, kepUrl } =
    request.body;
  try {
    const sql = "insert into ingatlanok values (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      null,
      kategoriaId,
      leiras,
      hirdetesDatuma,
      tehermentes,
      ar,
      kepUrl,
    ];
    const [rows, fields] = await connection.query(sql, values);
    response.status(201).json({ msg: "Ingatlan sikeresen hozzáaadva!" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/property/:id", async (request, response) => {
  const { id } = request.params;
  const { leiras, ar } = request.body;
  try {
    const sql = "update ingatlanok set leiras = ?, ar = ? where id = ?";
    const values = [leiras, ar, id];
    const [rows, fields] = await connection.query(sql, values);
    rows.affectedRows == 0
      ? response
          .status(404)
          .json({ msg: "Az adott azonosítóval nem található ingatlan! " })
      : response.status(200).json({ msg: "Sikeres módosítás!" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/property/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const sql = "delete from ingatlanok where id = ?";
    const values = [id];
    const [rows, fields] = await connection.query(sql, values);
    rows.affectedRows == 0
      ? response.status(404).json({ msg: "Az ingatlan nem található " })
      : response.status(200).json({ msg: "Sikeres törlés!" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/categories", async (request, response) => {
  try {
    const sql = "select * from kategoriak";
    const [rows, fields] = await connection.query(sql);
    response.status(200).send(rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`server listening on port : ${PORT}`));
