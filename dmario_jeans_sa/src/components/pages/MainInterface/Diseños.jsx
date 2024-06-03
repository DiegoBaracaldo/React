import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navegacion from './Navegacion';
import descarga_icon from "../../assets/img/descargar.png";
import { Link } from 'react-router-dom';

const Diseños = () => {
    const [nombreDiseño, setNombreDiseño] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost/prueba/APIs%20Android/diseño/fetch_diseño.php");
                console.log('Datos recibidos:', result.data);
                if (Array.isArray(result.data)) {
                    setData(result.data);
                } else {
                    console.error('Datos recibidos no son un array:', result.data);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleIngresar = async () => {
        const formData = new FormData();
        formData.append('nombre_diseño', nombreDiseño);
        formData.append('codigo', codigo);
        formData.append('descripcion', descripcion);
        formData.append('archivo', archivo);

        console.log('Datos a enviar:', formData);

        try {
            await axios.post("http://localhost/prueba/APIs%20Android/diseño/save_diseño.php", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Datos ingresados correctamente'
            });

            const newItem = {
                nombre_diseño: nombreDiseño,
                codigo,
                descripcion,
                archivo: archivo ? archivo.name : '' // Guardamos solo el nombre del archivo
            };

            setData([...data, newItem]);

            setNombreDiseño('');
            setCodigo('');
            setDescripcion('');
            setArchivo(null);
        } catch (error) {
            console.error('Error al enviar la información:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al registrar los datos'
            });
        }
    };

    const handleEliminar = async (codigo) => {
        console.log('Código a eliminar:', codigo);

        if (!/^[0-9]+$/.test(codigo)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El código debe contener solo números.'
            });
            return;
        }

        try {
            const response = await axios.delete(`http://localhost/prueba/APIs%20Android/diseño/delete_diseño.php?codigo=${codigo}`);
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: response.data.success
            });

            setData(data.filter(item => item.codigo !== codigo));
        } catch (error) {
            console.error('Error al eliminar la información:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.error : 'Error al eliminar los datos'
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
                <div>
                    <h2 className='identificador'>DISEÑOS</h2>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <h2 className='identificador'>INGRESAR DATOS</h2>
                    <br />
                    <br />
                    <div className="filtro_ingreso">
                        <label htmlFor="nombre_diseño">Diseño: </label>
                        <input
                            type="text"
                            id="nombre_diseño"
                            value={nombreDiseño}
                            onChange={(e) => setNombreDiseño(e.target.value)}
                        />
                        <label htmlFor="codigo">Código:</label>
                        <input
                            type="number"
                            id="codigo"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </div>
                    <div className='filtro_ingreso'>
                        <label htmlFor="descripcion">Descripción:</label>
                        <input
                            type="text"
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <label htmlFor="archivo">Archivo:</label>
                        <input
                            type="file"
                            id="archivo"
                            onChange={(e) => setArchivo(e.target.files[0])}
                        />
                    </div>
                    <div className="filtro_ingreso">
                        <button onClick={handleIngresar}>
                            <img src={descarga_icon} alt="Ingresar" style={{ width: '12px', height: '12px' }} />
                            Ingresar
                        </button>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className='consulta'>
                    <div className="resultados">
                        <table>
                            <thead className='identificador'>
                                <tr>
                                    <td>Nombre Diseño</td>
                                    <td>Código</td>
                                    <td>Descripción</td>
                                    <td>Archivo</td>
                                    <td>Acciones</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombre_diseño}</td>
                                            <td>{item.codigo}</td>
                                            <td>{item.descripcion}</td>
                                            <td>
                                                <a href={`http://localhost/prueba/APIs%20Android/diseño/files/${item.archivo}`} target="_blank" rel="noopener noreferrer">
                                                    {item.archivo}
                                                </a>
                                            </td>
                                            <td>
                                                <span onClick={() => handleEliminar(item.codigo)} className='crud'>Borrar</span>
                                                <Link to={`update_diseño/${item.codigo}`}>
                                                    <span className='edit-button'>Editar</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className='identificador'>No hay datos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diseños;
