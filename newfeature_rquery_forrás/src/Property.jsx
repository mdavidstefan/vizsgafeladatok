import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaHouse } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "./utils";
import noImage from "./assets/noImage.png";
const url = "http://localhost:8000/api/property/";

export const Property = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["properties", url + id],
    queryFn: getData,
  });
  const navigate = useNavigate();
  if (isLoading) return <div>loading...</div>;
  if (isError)
    return <div>Error occurred while fetching data! {error.message}</div>;
  data && console.log(data);

  const handleImageError = (event) => {
    event.target.src = noImage; // Alapértelmezett kép betöltése
  };

  return (
    <div className="container offers">
      <FaHouse onClick={() => navigate("/")} className="house" />
      {data && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            backgroundColor: "rgba(249, 249, 249,0.8)",
            margin: "3rem auto 1rem",
          }}
        >
          <h3>{data[0].kategNev}</h3>
          <img
            src={data[0].kepUrl}
            alt={data[0].kategoriaNev}
            style={{ width: "100%", borderRadius: "10px", maxWidth: "800px" }}
            onError={handleImageError}
          />
          <p>{data[0].leiras}</p>
          <h4>Ára: {data[0].ar} Ft</h4>

          <button className="btn " onClick={() => navigate("/properties")}>
            Vissza a többi hirdetéshez...
          </button>
        </div>
      )}
    </div>
  );
};
