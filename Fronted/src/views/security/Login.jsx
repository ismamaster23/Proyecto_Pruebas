import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Avatar, Link, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/Auth'; // Asegúrate de que la ruta sea correcta

const RootContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 900,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

const FormSection = styled(CardContent)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3),
    },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 60,
    height: 60,
    marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: '#4caf50',
    '&:hover': {
        backgroundColor: '#45a049',
    },
}));

const Login = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleRegisterClick = (event) => {
        event.preventDefault();
        navigate('/registrarDoctor');
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://pruebas-back-50777bb3ad67.herokuapp.com/api/login', { correo: email, password });
            dispatch(login({ email, token: response.data.token }));
            setSnackbarMessage('Inicio de sesión exitoso');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/pacientes');
            }, 2000);
        } catch (error) {
            setSnackbarMessage('Credenciales inválidas');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <RootContainer>
            <StyledCard>
                <FormSection>
                    <StyledAvatar src="/path-to-your-logo.png" id="logo" />
                    <Typography variant="h5" gutterBottom>
                        Iniciar sesión
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Inicia sesión en tu cuenta
                    </Typography>
                    <TextField 
                        fullWidth 
                        label="Correo electrónico" 
                        variant="outlined" 
                        margin="normal" 
                        id="email-field" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField 
                        fullWidth 
                        label="Contraseña" 
                        variant="outlined" 
                        margin="normal" 
                        type="password" 
                        id="password-field" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} id="login-button">
                        <StyledButton variant="contained" fullWidth onClick={handleLogin}>
                            Iniciar sesión
                        </StyledButton>
                    </motion.div>
                    <Box mt={2}>
                        <Typography variant="body2" color="textSecondary" align="center">
                            ¿No tienes una cuenta? <Link href="#" id="register-link" onClick={handleRegisterClick}>Regístrate aquí</Link>
                        </Typography>
                    </Box>
                    <Box mt={2} id="terms-privacy">
                        <Typography variant="body2" color="textSecondary" align="center">
                            Términos de uso. Política de privacidad
                        </Typography>
                    </Box>
                </FormSection>
            </StyledCard>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </RootContainer>
    );
};

export default Login;
