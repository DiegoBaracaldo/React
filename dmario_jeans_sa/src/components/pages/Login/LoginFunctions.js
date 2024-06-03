import axios from 'axios';

const handleInicioSesion = async (identificacion, nombre, cargo, contraseña) => {
    try {
        const response = await axios.get(`http://localhost/prueba/APIs%20Android/usuario/fetch_usuario.php?identificacion=${identificacion}`);
        
        if (response.data && 
            response.data.nombre === nombre &&
            response.data.identificacion === identificacion &&
            response.data.cargo === cargo &&
            response.data.contraseña === contraseña) {
            
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'Credenciales incorrectas' };
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { success: false, message: 'Error al iniciar sesión. Por favor, verifique sus credenciales e inténtelo nuevamente.' };
    }
};

export default handleInicioSesion;
