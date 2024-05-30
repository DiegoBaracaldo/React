import React from "react";
import { Link } from "react-router-dom";
import icon_lupa from "../../assets/lupa.png";
import Diseños from "./Diseños";
import Bodega from "./Bodega";
import EditarPerfil from "./EditarPerfil"
import Login from "../Login/LoginSignup"

function Navegacion() {
  return (
    <div className="Navegacion">
      <h2 className="titulo">D'mario Jean's</h2>
      <br />
      <nav className="navegadores">
        <ul>
          <li>
            <Link to="/Diseños">Diseños</Link>
          </li>
          <li>
            <Link to="/Bodega">Bodega</Link>
          </li>
          <li>
            <Link to= "/EditarPerfil">Editar Pefil</Link>
          </li>
          <li>
            <Link to="/">Cerrar sesión</Link>
          </li>
        </ul>
        <form action="" className="buscador">
          <img
            src={icon_lupa}
            alt="Icono de búsqueda"
            style={{ width: "12px", height: "12px" }}
          />
          <input type="text" />
          <button className="busqueda" type="submit">
            Buscar
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Navegacion;
