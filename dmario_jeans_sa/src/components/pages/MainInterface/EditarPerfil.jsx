import React from "react";
import { Link } from "react-router-dom";
import './estilos.css';

import icon_user from '../../assets/usuario.png';
import icon_id from '../../assets/id.png';
import icon_telefono from '../../assets/telefono.png';
import icon_password from '../../assets/bloquear.png';
import icon_lupa from '../../assets/lupa.png';

import Navegacion from './Navegacion';

function EditarPerfil() {
    return (
        <div>     
                   <Navegacion />
        <br />
        <br />
        <br />
        <div className="container">
            <div className="tabla">
                <table>
                    <thead>
                        <tr>
                            <th>Tipo de dato</th>
                            <th>Dato</th>
                            <th>Opción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={icon_user} alt="Icono de usuario" style={{width :"20px", height:"20px"}}/> Nombre</td> 
                            <td>Dato 1</td>
                            <td>
                                <button className="crud">Editar</button>
                                <button className="crud">Guardar</button>
                            </td>
                        </tr>
                        <tr>
                            <td><img src={icon_id} alt="Icono de identificación" width="20px" height="20px" /> Identificación</td>
                            <td>Dato 2</td>
                            <td>
                                <button className="crud">Editar</button>
                                <button className="crud">Guardar</button>
                            </td>
                        </tr>
                        <tr>
                            <td><img src={icon_telefono} alt="Icono de teléfono" width="20px" height="20px" /> Teléfono</td>
                            <td>Dato 3</td>
                            <td>
                                <button className="crud">Editar</button>
                                <button className="crud">Guardar</button>
                            </td>
                        </tr>
                        <tr>
                            <td><img src={icon_password} alt="Icono de contraseña" width="20px" height="20px" /> Contraseña</td>
                            <td>Dato 4</td>
                            <td>
                                <button className="crud">Editar</button>
                                <button className="crud">Guardar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default EditarPerfil;
