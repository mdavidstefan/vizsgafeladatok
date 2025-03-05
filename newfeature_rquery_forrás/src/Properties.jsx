import React from "react";
import { getData } from "./utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaHouse } from "react-icons/fa6";
import noImage from "./assets/noImage.png";
import { useState } from "react";
const base_url = "http://localhost:8000/api/property";
const url_ctg = "http://localhost:8000/api/categories";

export const Properties = () => {
  const [showCateg, setShowCateg] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [url, setUrl] = useState(base_url);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["properties", url],
    queryFn: getData,
  });
  const {
    data: dataCtg,
    isLoading: isLoadingCtg,
    isError: isErrorCtg,
    error: errorCtg,
  } = useQuery({
    queryKey: ["categories", url_ctg, showCateg],
    queryFn: getData,
    enabled: !!showCateg,
  });
  const navigate = useNavigate();

  if (isLoading) return <div>loading...</div>;
  if (isError)
    return <div>Error occurred while fetching data! {error.message}</div>;
  data && console.log(data);

  const handleImageError = (event) => {
    event.target.src = noImage; // Alapértelmezett kép betöltése
  };

  const handleFiltering = () => {
    if (!fromDate) return;
    console.log(fromDate, typeof fromDate);
    const dateArr = fromDate.split("-");
    console.log("hónap :", dateArr[1]);
    console.log("nap :", dateArr[2]);
    //const nap = dateArr[2]
    const [year, month, day] = dateArr;
    console.log(year, month, day);
    setUrl(base_url + "/from/" + fromDate);
  };

  const deleteFiltering = () => {
    setUrl(base_url);
  };

  return (
    <div className="container offers">
      <FaHouse onClick={() => navigate("/")} className="house" />

      <div className="form-group">
        <label className="form-label">Hirdetés dátuma</label>
        <input
          type="date"
          className="form-control"
          name="hirdetesDatuma"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="from-group text-center">
        <button className="btn" onClick={handleFiltering}>
          A kiválasztott dátum utáni hirdetések
        </button>
      </div>
      <div className="from-group text-center">
        <button className="btn" onClick={deleteFiltering}>
          A kiválasztott dátum utáni hirdetések
        </button>
      </div>

      <h2 className="section-title">Aktuális ajánlataink</h2>
      <div className="listings-container">
        {data &&
          data.map((obj) => (
            <div className="listing-card" key={obj.id}>
              <div className="card-header">
                <span className="title">{obj.kategNev}</span>
                <span className="date">{obj.hirdetesDatuma.slice(0, 10)}</span>
              </div>
              <img
                className="card-image"
                src={obj.kepUrl}
                alt="Ház"
                onError={handleImageError}
              />
              <div className="card-footer">
                <button
                  className="btn "
                  onClick={() => navigate("/property/" + obj.id)}
                >
                  Részletek
                </button>
              </div>
            </div>
          ))}
        {isError && <div>{error.response?.data?.msg}</div>}
      </div>
      <button onClick={() => setShowCateg(!showCateg)}>
        kategóriák listázása / eltüntetése
      </button>
      <ul>
        {dataCtg && dataCtg.map((obj) => <li key={obj.id}>{obj.nev}</li>)}
      </ul>
    </div>
  );
};
