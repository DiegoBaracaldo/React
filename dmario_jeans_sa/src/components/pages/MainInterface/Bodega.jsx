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

const Bodega = () => {
    // URLs para las APIs
    const urlIngreso = 'http://localhost/prueba/APIs%20Android/bodega/save_bodega.php';
    const url = 'http://localhost/prueba/APIs%20Android/bodega/fetch_bodega.php?codigo={codigo}';

    // Estados para el método POST
    const [codigo, setCodigo] = useState('');
    const [idBodega, setIdBodega] = useState('');
    const [diaExacto, setDiaExacto] = useState('');
    const [tipoMovimiento, setTipoMovimiento] = useState('');
    const [cant, setCant] = useState('');

    // Estados para el método GET
    const [datos, setDatos] = useState([]);
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');

    useEffect(() => {
        getBodega();
    }, []);

    const getBodega = async () => {
        try {
            const respuesta = await axios.get(url);
            setDatos(respuesta.data);
        } catch (error) {
            console.error("Error al obtener los datos de la API", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al obtener los datos de la bodega'
            });
        }
    }

    const handleBuscar = () => {
        // Filtra los datos según la fecha y el tipo de movimiento
        const datosFiltrados = datos.filter(dato =>
            (!fechaFiltro || dato.diaExacto === fechaFiltro) &&
            (!tipoFiltro || dato.tipoMovimiento === tipoFiltro)
        );
        setDatos(datosFiltrados);
    }

    const handleIngresar = () => {

    }

    const handleEditar = (id) => {

    }

    const handleEliminar = (id) => {

    }

    return (
        <div>
            <Navegacion />
            <br />
            <br />
            <br />
            <div className="container">
                <div>
                    <h2 className='identificador'>BODEGA</h2>
                    <br />

                    <div className='ingreso'>
                    </div>
                    <h2 className='identificador'>INGRESAR DATOS</h2>
                    <div className="filtro_ingreso">
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            value={diaExacto}
                            onChange={(e) => setDiaExacto(e.target.value)}
                        />
                        <label htmlFor="descripcion">Descripcion:</label>
                        <input
                            type="text"
                            id="descripcion"
                            value={idBodega}
                            onChange={(e) => setIdBodega(e.target.value)}
                        />
                    </div>
                    <div className='filtro_ingreso'>
                        <select
                            name="tipo"
                            id="tipo"
                            value={tipoMovimiento}
                            onChange={(e) => setTipoMovimiento(e.target.value)}
                        >
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                        </select>
                        <label htmlFor="cantidad">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            value={cant}
                            onChange={(e) => setCant(e.target.value)}
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

                    <h2 className='identificador '> CONSULTA BODEGA</h2>
                    <div className="filtro">
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            value={fechaFiltro}
                            onChange={(e) => setFechaFiltro(e.target.value)}
                        />
                        <select
                            name="tipo"
                            id="tipo"
                            value={tipoFiltro}
                            onChange={(e) => setTipoFiltro(e.target.value)}
                        >
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                        </select>
                        <button onClick={handleBuscar}>
                            <img src={icon_lupa} alt="Buscar" style={{ width: '12px', height: '12px' }} />
                            Buscar
                        </button>
                    </div>
                    <div className="resultados">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th> {/* Nueva columna para botones */}
                                </tr>
                            </thead>
                            <tbody>
                                {datos.map((dato, index) => (
                                    <tr key={index}>
                                        <td>{dato.diaExacto}</td>
                                        <td>{dato.descripcion}</td>
                                        <td>{dato.tipoMovimiento}</td>
                                        <td>{dato.cant}</td>
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

export default Bodega;
