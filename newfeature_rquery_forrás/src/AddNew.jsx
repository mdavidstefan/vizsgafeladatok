import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postData, getData } from "./utils";
import { FaHouse } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";

const url = "http://localhost:8000/api/categories";

const urlNewData = "http://localhost:8000/api/property";

export const AddNew = () => {
  const { data } = useQuery({
    queryKey: ["properties", url],
    queryFn: getData,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      kategoriaId: formData.get("kategoriaId"),
      leiras: formData.get("leiras"),
      hirdetesDatuma: formData.get("hirdetesDatuma"),
      tehermentes: formData.get("tehermentes") == "on" ? 1 : 0,
      ar: formData.get("ar"),
      kepUrl: formData.get("kepUrl"),
    };
    try {
      postData(urlNewData, newData);
      alert("Sikeres hirdetés feladás!");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/properties");
    }
  };

  return (
    <div className="container">
      <div className="container-newad">
        <h2 className="form-title">Új hirdetés elküldése</h2>
        <FaHouse onClick={() => navigate("/")} className="house" />
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Ingatlan kategóriája</label>
            <select className="form-select" name="kategoriaId">
              <option value="0">Kérem válasszon</option>
              {data &&
                data.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.nev}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Hirdetés dátuma</label>
            <input type="date" className="form-control" name="hirdetesDatuma" />
          </div>
          <div className="form-group">
            <label className="form-label">Ár:</label>
            <input type="number" className="form-control" name="ar" />
          </div>
          <div className="form-group">
            <label className="form-label">Ingatlan leírása</label>
            <textarea
              className="form-control"
              rows="3"
              name="leiras"
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">A fotó URL-je:</label>
            <input type="text" className="form-control" name="kepUrl" />
          </div>

          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked
              name="tehermentes"
            />
            <label className="form-check-label">Tehermentes ingatlan</label>
          </div>

          <div className="form-group text-center">
            <button className="btn">Küldés</button>
          </div>
        </form>
      </div>
    </div>
  );
};
