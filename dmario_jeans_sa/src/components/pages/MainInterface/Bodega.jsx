import React from "react";
import { Link } from 'react-router-dom';
import './estilos.css'
import icon_lupa from '../../assets/lupa.png';
import Navegacion from "./Navegacion";
const Bodega= ()=>{
return(
    <div>     
            <Navegacion />
                <br />
                <br />  
                <br />
    <div className="container">
            <Navegacion/>
        <div>
            <h2>Bodega</h2>
        </div>
        <div className="filtro">
            <label htmlFor="fecha">Fecha:</label>
            <input type="date" id="fecha" />
                <select name="tipo" id="tipo">
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
            </select>
             <button> <img src="icon_lupa" alt="" style={{width: '12px', height: '12px' }} />Buscar</button>
        </div>
        <div className="resultados">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2024-04-30</td>
                            <td>Producto A ingresado a la bodega</td>
                            <td>Entrada</td>
                        </tr>
                        <tr>
                            <td>2024-04-29</td>
                            <td>Producto B enviado desde la bodega</td>
                            <td>Salida</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

}
export default Bodega;