import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css';
import user_icon from '../../assets/img/usuario.png';
import id_icon from '../../assets/img/id.png';
import rol_icon from '../../assets/img/rol.png';
import password_icon from '../../assets/img/bloquear.png';
import telefono_icon from '../../assets/img/telefono.png';


const Signup = () => {
    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user_info')) {
            navigate("/");
        }
    }, [navigate]);

    const handleRegistro = async () => {
        console.warn(nombre, identificacion, telefono, cargo, contraseña);
        let item = { nombre, identificacion, telefono, cargo, contraseña };

        try {
            const result = await fetch("http://localhost/prueba/APIs%20Android/usuario/save_usuario.php", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await result.json();
            localStorage.setItem("user-info", JSON.stringify(data));
            navigate("/");
        } catch (error) {
            console.error('Error al enviar la información:', error);
            alert('Error al registrar usuario');
        }
    };

    const handleLogin = () => {
        navigate('/');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div>
            <div className='title'>D'MARIO JEAN'S S.A</div>
            <br />
            <br />
            <div className='container'>
                <div className='title-indicador'>
                    <h4>REGISTRATE</h4>
                </div>
                <br />
                <div className='submit-container-navegacion'>
                    <div className="submit" onClick={handleLogin}>Iniciar Sesion</div>
                    <div className="submit" onClick={handleSignup}>Registrate</div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <img src={user_icon} alt="User Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={id_icon} alt="ID Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="number" placeholder="Identificacion" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={rol_icon} alt="Role Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={telefono_icon} alt="telefono Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="text" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className='input'>
                        <img src={password_icon} alt="Password Icon" style={{ width: '24px', height: '24px' }} />
                        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                    </div>
                </div>
                <div className='submit-container'>
                    <div className="submit" onClick={handleRegistro}>Registrate</div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
