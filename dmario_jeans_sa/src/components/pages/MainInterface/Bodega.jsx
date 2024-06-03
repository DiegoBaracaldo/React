import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Navegacion from './Navegacion';
import icon_lupa from "../../assets/img/lupa.png";
import descarga_icon from "../../assets/img/descargar.png";

import { Link } from 'react-router-dom';

const Bodega = () => {
    const [codigo, setCodigo] = useState('');
    const [idDiseño, setIdDiseño] = useState('');
    const [diaExacto, setDiaExacto] = useState('');
    const [tipoMovimiento, setTipoMovimiento] = useState('');
    const [cant, setCant] = useState('');
    const [data, setData] = useState([]);
    const [newItemValue, setNewItemValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost/prueba/APIs%20Android/bodega/fetch_bodega.php");
                console.log('Datos recibidos:', result.data);
                // Verificar que result.data es un array
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
        let item = { codigo, id_diseño: idDiseño, dia_exacto: diaExacto, tipo_movimiento: tipoMovimiento, cant };

        console.log('Datos a enviar:', item);

        try {
            await axios.post("http://localhost/prueba/APIs%20Android/bodega/save_bodega.php", item, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Datos ingresados correctamente'
            });
            // Actualizar la lista después de ingresar
            setData([...data, item]);
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
        console.log('Código a eliminar:', codigo);  // Log para verificar el código que se intenta eliminar

        // Verifica si el código contiene solo números
        if (!/^[0-9]+$/.test(codigo)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El código debe contener solo números.'
            });
            return;
        }

        try {
            const response = await axios.delete(`http://localhost/prueba/APIs%20Android/bodega/delete_bodega.php?codigo=${codigo}`);
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: response.data.success
            });

            // Actualizar la lista después de eliminar
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
                    <h2 className='identificador'>BODEGA</h2>
                    <br />
                    <div className='ingreso'>
                    </div>
                    <h2 className='identificador'>INGRESAR DATOS</h2>
                    <br />
                    <br />
                    <div className="filtro_ingreso">
                        <label htmlFor="codigo">Código:</label>
                        <input
                            type="number"
                            id="codigo"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            value={diaExacto}
                            onChange={(e) => setDiaExacto(e.target.value)}
                        />
                    </div>
                    <div className="filtro_ingreso">
                        <label htmlFor="descripcion">Descripción:</label>
                        <input
                            type="text"
                            id="descripcion"
                            value={idDiseño}
                            onChange={(e) => setIdDiseño(e.target.value)}
                        />
                    </div>
                    <div className="filtro_ingreso">
                        <select
                            name="tipo"
                            id="tipo"
                            value={tipoMovimiento}
                            onChange={(e) => setTipoMovimiento(e.target.value)}
                        >
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                        </select>
                    </div>
                    <div className="filtro_ingreso">
                        <label htmlFor="cantidad">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            value={cant}
                            onChange={(e) => setCant(e.target.value)}
                        />
                    </div>
                    <div className="filtro_ingreso">
                        <button onClick={handleIngresar}>
                            <img src={descarga_icon} alt="Ingresar" style={{ width: '12px', height: '12px' }} />
                            Ingresar
                        </button>
                        <button >
                            <img src={icon_lupa} alt="Buscar" style={{ width: '12px', height: '12px' }} />
                            Buscar
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
                                   <td>Fecha</td>
                                   <td>Codigo</td>
                                   <td>Descripcion</td>
                                   <td>Tipo</td>
                                   <td>Cantidad</td>
                                   <td>Acciones</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.dia_exacto}</td>
                                            <td>{item.codigo}</td>
                                            <td>{item.id_diseño}</td>
                                            <td>{item.tipo_movimiento}</td>
                                            <td>{item.cant}</td>
                                            <td>
                                               <td>
                                               <span onClick={() => handleEliminar(item.codigo)} className='crud'>Borrar</span>
                                               </td>
                                                <td>
                                                    <Link to={"update_bodega"}>
                                                    <span  className='edit-button'>Editar</span>
                                                    </Link>
                                                </td>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className='identificador'>No hay datos disponibles</td>
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
    export default Bodega;    