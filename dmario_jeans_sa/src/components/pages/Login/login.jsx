import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css';
import user_icon from '../../assets/img/usuario.png';
import id_icon from '../../assets/img/id.png';
import rol_icon from '../../assets/img/rol.png'; 
import password_icon from '../../assets/img/bloquear.png';
import telefono_icon from '../../assets/img/telefono.png';

const Login = () => {
    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();
    const [redirectToMain, setRedirectToMain] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user_info')) {
            navigate("/editar");
        }
    }, [navigate]);

    useEffect(() => {
        if (redirectToMain) {
            navigate("/editar");
        }
    }, [redirectToMain, navigate]);

    const handleInicioSesion = async () => {
        if (!nombre || !identificacion || !cargo || !contraseña || !telefono) {
            alert('Por favor complete todos los campos');
            return;
        }

        try {
            const result = await fetch(`http://localhost/prueba/APIs%20Android/usuario/fetch_usuario.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identificacion
                })
            });

            if (!result.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await result.json();

            if (data &&
                data.nombre === nombre &&
                data.identificacion.toString() === identificacion &&
                data.cargo === cargo &&
                data.contraseña === contraseña &&
                data.telefono === telefono) {
                localStorage.setItem("user_info", JSON.stringify(data));
                setRedirectToMain(true);
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error de ingreso:', error);
            alert('Error, usuario no encontrado');
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
            <br />
            <div className='title'>D'MARIO JEAN'S S.A</div>
            <br />
            <br />
            <div className='container'>
                <div className='title-indicador'>
                    <h4>INICIAR SESION</h4>
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
                <div className="submit-container">
                    <div className="submit" onClick={handleInicioSesion}>Iniciar sesión</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
