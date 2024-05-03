import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./estilos.css";
import cod_icon from "../../assets/codigo.png";
import diseñador_icon from "../../assets/usuario.png";
import icon_lupa from "../../assets/lupa.png";
import descrip_icon from "../../assets/descripcion.png";

import Navegacion from "./Navegacion";

const Diseños = () => {
  const [action, setAction] = useState("Registrar");

  const [codigo, setCodigo] = useState("");
  const [diseñador, setDiseñador] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const enviarInformacion = () => {
    console.log("Informacion enviada:", {
      codigo,
      diseñador,
      descripcion,
    });
    setCodigo("");
    setDiseñador("");
    setDescripcion("");
  };

  return (
    <div>     
        <Navegacion />
          <br />
          <br />
          <br />

    <div className="container">
      <div className="inputs">
        <div className="input">
          <img src={cod_icon} alt="" style={{ width: "14px", height: "14px" }} />
          <input
            type="text"
            placeholder="Codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>
        <div className="input">
          <img
            src={diseñador_icon}
            alt=""
            style={{ width: "14px", height: "14px" }}
          />
          <input
            type="text"
            placeholder="Diseñador"
            value={diseñador}
            onChange={(e) => setDiseñador(e.target.value)}
          />
        </div>
        <div className="input">
          <img
            src={descrip_icon}
            alt=""
            style={{ width: "14px", height: "14px" }}
          />
          <input
            type="text"
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="submit-container">
          <button className="submit" onClick={enviarInformacion}>
            Buscar
          </button>
        </div>
      </div>
      <div className="submit-container">
        <div
          className={action === "Registrar" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Registrar");
          }}
        >
          Registrar
        </div>
        <div
          className={action === "Consultar" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Consultar");
          }}
        >
          Consultar
        </div>
      </div>
    </div>
  </div>
  );
};

export default Diseños;
