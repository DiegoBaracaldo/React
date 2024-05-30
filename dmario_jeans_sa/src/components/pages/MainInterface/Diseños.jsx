import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from './mainFunctions';

/* Importaciones de links internos */ 
import Navegacion from './Navegacion';
import icon_cod from "../../assets/codigo.png";
import icon_diseñador from "../../assets/usuario.png";
import icon_lupa from "../../assets/lupa.png";
import descrip_icon from "../../assets/descripcion.png";
import descarga_icon from "../../assets/descargar.png";
import consultar_icon from "../../assets/consultar.png";
import eliminar_icon from "../../assets/eliminar.png"; // Asegúrate de que este icono esté disponible

function Diseños() {
    // URLs para APIs
    const urlIngreso = 'http://localhost/prueba/APIs%20Android/diseño/save_diseño.php';
    const urlFetch = 'http://localhost/prueba/APIs%20Android/diseño/fetch_diseño.php';

    // Estados para métodos POST
    const [nombre_diseño, setNombre_diseño] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);

    // Estados para métodos GET
    const [datos, setDatos] = useState([]);
    const [nombre_diseño_filtro, setNombre_diseñoFiltro] = useState('');
    const [codigofiltro, setCodigoFiltro] = useState('');

    useEffect(() => {
        getDiseño();
    }, []);

    const getDiseño = async () => {
        try {
            const respuesta = await axios.get(urlFetch);
            setDatos(respuesta.data);
        } catch (error) {
            console.error("Error al obtener los datos de la API", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al obtener los datos de diseño'
            });
        }
    }

    const handleBuscar = () => {
        // Filtra los datos según el filtro establecido
        const datosFiltrados = datos.filter(dato => 
            (!codigofiltro || dato.codigo === codigofiltro) && 
            (!nombre_diseño_filtro || dato.nombre_diseño === nombre_diseño_filtro)
        );
        setDatos(datosFiltrados);
    }

    const handleIngresar = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre_diseño', nombre_diseño);
            formData.append('codigo', codigo);
            formData.append('descripcion', descripcion);
            formData.append('archivo', archivo);

            const respuesta = await axios.post(urlIngreso, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El diseño ha sido ingresado correctamente'
            });

            // Limpiar los campos
            setNombre_diseño('');
            setCodigo('');
            setDescripcion('');
            setArchivo(null);

            // Refrescar los datos
            getDiseño();

        } catch (error) {
            console.error("Error al ingresar el diseño", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al ingresar el diseño'
            });
        }
    }

    const handleEditar = (id) => {
        // Lógica para editar datos
        // Aquí deberías implementar la lógica para editar un diseño
    }

    const handleEliminar = async (id) => {
        try {
            const respuesta = await axios.delete(`${urlFetch}?id=${id}`);

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'El diseño ha sido eliminado correctamente'
            });

            // Refrescar los datos
            getDiseño();

        } catch (error) {
            console.error("Error al eliminar el diseño", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al eliminar el diseño'
            });
        }
    }

    return (
        <div>
            <Navegacion />
            <br />
            <br />
            <br />
            <div className="container">
                <div>
                    <h2 className='identificador'>DISEÑOS</h2>
                    <br />
                    <div className='ingreso'>
                    </div>
                    <h2 className='identificador'>INGRESAR DATOS</h2>
                    <div className="filtro_ingreso">
                        <label htmlFor="nombre_diseño">Diseño: </label>
                        <input
                            type="text"
                            id="nombre_diseño"
                            value={nombre_diseño}
                            onChange={(e) => setNombre_diseño(e.target.value)}
                        />
                        <label htmlFor="codigo">Codigo:</label>
                        <input
                            type="text"
                            id="codigo"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </div>
                    <div className='filtro_ingreso'>
                        <label htmlFor="descripcion">Descripcion:</label>
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
                    <h2 className='identificador'>CONSULTA DISEÑOS</h2>
                    <div className="filtro">
                        <label htmlFor="nombre_diseño_filtro">Diseño:</label>
                        <input
                            type="text"
                            id="nombre_diseño_filtro"
                            value={nombre_diseño_filtro}
                            onChange={(e) => setNombre_diseñoFiltro(e.target.value)}
                        />
                        <label htmlFor="codigo_filtro">Codigo:</label>
                        <input
                            type="text"
                            id="codigo_filtro"
                            value={codigofiltro}
                            onChange={(e) => setCodigoFiltro(e.target.value)}
                        />
                        <button onClick={handleBuscar}>
                            <img src={icon_lupa} alt="Buscar" style={{ width: '12px', height: '12px' }} />
                            Consultar
                        </button>
                    </div>
                    <div className="resultados">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre Diseño</th>
                                    <th>Codigo</th>
                                    <th>Descripcion</th>
                                    <th>Archivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.map((dato, index) => (
                                    <tr key={index}>
                                        <td>{dato.nombre_diseño}</td>
                                        <td>{dato.codigo}</td>
                                        <td>{dato.descripcion}</td>
                                        <td>{dato.archivo}</td>
                                        <td>
                                            <button onClick={() => handleEditar(dato.id)}>
                                                <img src={consultar_icon} alt="Editar" style={{ width: '12px', height: '12px' }} />
                                                Editar
                                            </button>
                                            <button onClick={() => handleEliminar(dato.id)}>
                                                <img src={eliminar_icon} alt="Eliminar" style={{ width: '12px', height: '12px' }} />
                                                Eliminar
                                            </button>
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
}

export default Diseños;
