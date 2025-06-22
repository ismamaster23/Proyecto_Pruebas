import React from 'react';
import { Avatar } from '@mui/material';
import './Avatar.css';

const Personal = () => {
    const usuario = {
        nombre: 'Juan Pérez',
        correo: 'juan.perez@ejemplo.com',
        enlace: '#',
    };

    return (
        <div className="componente-usuario">
            <div className="avatar-container">
                <Avatar
                    alt="Avatar"
                    src="./profile.jpg" // Replace with actual image source
                    sx={{ width: 80, height: 80 }} // Set avatar size (optional)
                />
            </div>
            <div className="nombre-correo">
                <h3 className="nombre">{usuario.nombre}</h3>
                <p className="correo">{usuario.correo}</p>
            </div>
        </div>
    );
};

export default Personal;
