// EditarPerfil.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navegacion from './Navegacion';
import './estilos.css'; 
import icon_user from '../../assets/usuario.png';
import icon_id from '../../assets/id.png';
import icon_telefono from '../../assets/telefono.png';
import icon_password from '../../assets/bloquear.png';


const EditarPerfil = () => {
    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get('http://localhost/prueba/APIs%20Android/usuario/fetch_usuario.php')
            .then(response => {
                const data = response.data;
                setNombre(data.nombre);
                setIdentificacion(data.identificacion);
                setTelefono(data.telefono);
                setPassword(data.password);
            })
            .catch(error => {
                console.error('Error al obtener perfil:', error);
            });
    }, []);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        // Lógica para guardar los cambios
        axios.put('http://localhost/prueba/APIs%20Android/usuario/edit_usuario.php', {
            nombre: nombre,
            identificacion: identificacion,
            telefono: telefono,
            password: password
        })
            .then(response => {
                console.log('Perfil actualizado correctamente');
                setEditMode(false); // Desactivar modo de edición
            })
            .catch(error => {
                console.error('Error al actualizar perfil:', error);
            });
    };

    return (
        <div>
            <Navegacion />
            <br />
            <br />
            <br />
            <div className="container">
                <Navegacion />
                <div className='inputs'>
                    <div className="input">
                        <img src={icon_user} alt="" style={{ width: "14px", height: "14px" }} />
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            disabled={!editMode} // Deshabilitar input en modo de visualización
                        />
                        {!editMode && (
                            <button className="edit-button" onClick={handleEdit}>Editar</button>
                        )}
                    </div>
                    <div className="input">
                        <img src={icon_id} alt="" style={{ width: "14px", height: "14px" }} />
                        <input
                            type="text"
                            placeholder="Identificación"
                            value={identificacion}
                            onChange={(e) => setIdentificacion(e.target.value)}
                            disabled={!editMode} // Deshabilitar input en modo de visualización
                        />
                        {!editMode && (
                            <button className="edit-button" onClick={handleEdit}>Editar</button>
                        )}
                    </div>
                    <div className="input">
                        <img src={icon_telefono} alt="" style={{ width: "14px", height: "14px" }} />
                        <input
                            type="text"
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            disabled={!editMode} // Deshabilitar input en modo de visualización
                        />
                        {!editMode && (
                            <button className="edit-button" onClick={handleEdit}>Editar</button>
                        )}
                    </div>
                    <div className="input">
                        <img src={icon_password} alt="" style={{ width: "14px", height: "14px" }} />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!editMode} // Deshabilitar input en modo de visualización
                        />
                        {!editMode && (
                            <button className="edit-button" onClick={handleEdit}>Editar</button>
                        )}
                    </div>
                    {editMode && (
                        <div className="submit-container">
                            <button className="submit" onClick={handleSave}>Guardar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditarPerfil;
