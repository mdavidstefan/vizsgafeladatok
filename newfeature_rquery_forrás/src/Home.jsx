import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <FaHouse onClick={() => navigate("/")} className="house" />
      <h1 className="title">Ingatlanügynökség</h1>
      <div className="button-container">
        <button className="btn" onClick={() => navigate("/properties")}>
          Nézze meg kínálatunkat!
        </button>
        <button className="btn" onClick={() => navigate("/addnew")}>
          Hirdessen nálunk!
        </button>
      </div>
    </div>
  );
};
