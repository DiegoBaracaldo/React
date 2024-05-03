import React, { useState } from 'react';

import './Login.css';
import user_icon from '../../assets/usuario.png';
import id_icon from '../../assets/id.png';
import rol_icon from '../../assets/rol.png';
import telefono_icon from '../../assets/telefono.png';
import password_icon from '../../assets/bloquear.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Registrate");



    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    

    const enviarInformacion=()=>{
        console.log('Informacion enviada:',{
            nombre: nombre,
            identificacion: identificacion,
            cargo: cargo,
            telefono: telefono,
            password: password,
        });
        setNombre('');
        setIdentificacion('');
        setCargo('');
        setTelefono('');
        setPassword('');
    };

    return (
        <div>
            <div className="title">D'mario Jean's S.A</div>
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" style={{ width: '24px', height: '24px' }} />
                        <input type="text" placeholder="Nombre"  value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                    </div>
                    <div className="input">
                        <img src={id_icon} alt="" style={{ width: '24px', height: '24px' }} />
                        <input type="number" placeholder="Identificacion" value={identificacion} onChange={(e)=>setIdentificacion(e.target.value)}/>
                    </div>
                    <div className="input">
                        <img src={rol_icon} alt="" style={{ width: '24px', height: '24px' }} />
                        <input type="text" placeholder="Cargo" value={cargo} onChange={(e)=>setCargo(e.target.value)}/>
                    </div>
                    <div className="input">
                        <img src={telefono_icon} alt="" style={{ width: '24px', height: '24px' }} />
                        <input type="number" placeholder="Telefono" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" style={{ width: '24px', height: '24px' }} />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="submit-container">
                        <button className="submit" onClick={enviarInformacion}>Enviar</button>
                    </div>
                </div>
                <div className="forgot-password">olvide mi contraseña <span>Click aqui</span></div>
                <div className="submit-container">
                    <div className={action === "Registrate" ? "submit gray" : "submit"} onClick={() => { setAction("Registrate") }}>Registrate</div>
                    <div className={action === "Iniciar sesión" ? "submit gray" : "submit"} onClick={() => { setAction("Iniciar sesión") }}>Iniciar sesión</div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;