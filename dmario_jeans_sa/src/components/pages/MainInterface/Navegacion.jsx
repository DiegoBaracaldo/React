import React from "react";
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css'
import { Link } from "react-router-dom";
import icon_lupa from "../../assets/img/lupa.png";

function Navegacion() {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    // Eliminar datos de usuario del almacenamiento local
    localStorage.removeItem("user_info");
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/");
  };

  return (
    <div>
      <div className="navegacion">
        <h1>D'MARIO JEAN'S</h1>
      </div>
      <br />
      <br />
      <div className="listado">
        <ul>
          <li>
            <button className="submit" onClick={() => navigate("/editar")}>Usuarios</button>
          </li>
          <li>
            <button className="submit" onClick={() => navigate("/diseño")}>Diseños</button>
          </li>
          <li>
            <button className="submit" onClick={() => navigate("/bodega")}>Bodega</button>
          </li>
          <li>
            <button className="submit" onClick={handleCerrarSesion}>Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navegacion;
