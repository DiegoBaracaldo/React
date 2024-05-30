import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './Login.css';
import user_icon from '../../assets/usuario.png';
import id_icon from '../../assets/id.png';
import rol_icon from '../../assets/rol.png';
import telefono_icon from '../../assets/telefono.png';
import password_icon from '../../assets/bloquear.png';

const LoginSignup = ({ isAuthenticated }) => {
    const [action, setAction] = useState("Bienvenido");
    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [redirectToMain, setRedirectToMain] = useState(false);

    const handleRegistro = async () => {
        try {
            const response = await axios.post('http://localhost/prueba/APIs%20Android/usuario/save_usuario.php', {
                nombre,
                identificacion,
                cargo,
                telefono,
                contraseña,
            });
            console.log(response.data); 
            setNombre('');
            setIdentificacion('');
            setCargo('');
            setTelefono('');
            setContraseña('');
            alert('Registro exitoso');
        } catch (error) {
            console.error('Error al enviar información:', error);
            alert('Error al registrar usuario');
        }
    };

    const handleInicioSesion = async () => {
        try {
            const response = await axios.get(`http://localhost/prueba/APIs%20Android/usuario/fetch_usuario.php?identificacion=${identificacion}`);
            if (response.data && response.data.contraseña === contraseña) {
                console.log('Inicio de sesión exitoso');
                setRedirectToMain(true);
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert("Error al iniciar sesión. Por favor, verifique sus credenciales e inténtelo nuevamente.");
        }
    };

    if (redirectToMain) {
        return <Navigate to="/editar" />;
    }

    return (
        <div>
            <div className="title">D'MARIO JEANS S.A</div>
            <br />
            <br />
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="User Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={id_icon} alt="ID Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="number" placeholder="Identificacion" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={rol_icon} alt="Role Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={telefono_icon} alt="Phone Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="number" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="Password Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                    </div>
                </div>
                <div className="submit-container">
                    <div className={action === "Registrate" ? "submit gray" : "submit"} onClick={handleRegistro}>Registrate</div>
                    <div className={action === "Iniciar sesión" ? "submit gray" : "submit"} onClick={handleInicioSesion}>Iniciar sesión</div>
                </div>
                <div className="forgot-password">Olvidé mi contraseña <span>Click aquí</span></div>
            </div>
        </div>
    );
};

export default LoginSignup;
