import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navegacion from './Navegacion';
import '../../assets/css/estilos.css';
import icon_user from '../../assets/img/usuario.png';
import icon_telefono from '../../assets/img/telefono.png';
import editar_icon from '../../assets/img/editar.png';
import guardar_icon from '../../assets/img/guardar.png';

const EditarPerfil = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const result = await axios.get('http://localhost/prueba/APIs%20Android/usuario/list_usuario.php');
                setUsuarios(result.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleEdit = (usuario) => {
        setEditMode(usuario.identificacion);
        setNombre(usuario.nombre);
        setTelefono(usuario.telefono);
    };

    const handleSave = async (identificacion) => {
        try {
            await axios.put('http://localhost/prueba/APIs%20Android/usuario/edit_usuario.php', {
                identificacion,
                nombre,
                telefono
            });
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Perfil actualizado correctamente'
            });
            setUsuarios(usuarios.map(user => user.identificacion === identificacion ? { ...user, nombre, telefono } : user));
            setEditMode(null);
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar perfil'
            });
        }
    };

    return (
        <div>
            <Navegacion />
            <br />
            <br />
            <br />
            <div className="container">
                <h2 className='identificador'>Usuarios activos</h2>
                <br />
                <div className='consulta'>
                    <div className="resultados">
                        <table>
                            <thead className='identificador'>
                                <tr>
                                    <td>Nombre</td>
                                    <td>Identificación</td>
                                    <td>Teléfono</td>
                                    <td>Acciones</td>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario, index) => (
                                    <tr key={index}>
                                        <td>
                                            {editMode === usuario.identificacion ? (
                                                <input
                                                    type="text"
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                />
                                            ) : (
                                                usuario.nombre
                                            )}
                                        </td>
                                        <td>{usuario.identificacion}</td>
                                        <td>
                                            {editMode === usuario.identificacion ? (
                                                <input
                                                    type="text"
                                                    value={telefono}
                                                    onChange={(e) => setTelefono(e.target.value)}
                                                />
                                            ) : (
                                                usuario.telefono
                                            )}
                                        </td>
                                        <td>
                                            {editMode === usuario.identificacion ? (
                                                <button className="edit-button" onClick={() => handleSave(usuario.identificacion)}>
                                                    <img src={guardar_icon} alt="Guardar" style={{ width: '12px', height: '12px' }} />
                                                    Guardar
                                                </button>
                                            ) : (
                                                <button className="edit-button" onClick={() => handleEdit(usuario)}>
                                                    <img src={editar_icon} alt="Editar" style={{ width: '12px', height: '12px' }} />
                                                    Editar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfil;
