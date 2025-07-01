import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, Container, IconButton, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TEMP_LOGO_URL = require('./../../media/LA WEA FOME.png'); // Asegúrate de que la ruta sea correcta

const BackgroundContainer = styled('div')({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '0 20px'
});

const Logo = styled('img')({
    width: '40%', // Ajusta el tamaño del logo según sea necesario
    height: 'auto',
});

const StyledButton = styled(Button)(({ theme, isMobile }) => ({
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    ...(isMobile && {
        width: '40vw', // Ancho del botón en vista móvil
        fontSize: '1em', // Tamaño del texto del botón en vista móvil
        marginLeft: 0,
        marginRight: theme.spacing(1),
    }),
}));

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/registrarDoctor');
    };

    return (
        <BackgroundContainer>
            <Container maxWidth="md">
                <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}>
                    <CardContent>
                        <Box display="flex" justifyContent="center" mb={3}>
                            <Logo src={TEMP_LOGO_URL} alt="Logo" />
                        </Box>
                        <Typography variant="h5" component="p" gutterBottom>
                            "Potencia tu práctica nutricional con precisión y eficiencia – Nutricalculinator, tu aliado en el camino hacia la salud óptima tus pacientes."
                        </Typography>
                        <Box mt={4} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                            <StyledButton variant="contained" isMobile={isMobile} onClick={handleLogin}>
                                Iniciar Sesión
                            </StyledButton>
                            <StyledButton variant="contained" isMobile={isMobile} onClick={handleRegister}>
                                Registrarse
                            </StyledButton>
                        </Box>
                    </CardContent>
                </Card>
                <Box mt={4}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton color="inherit">
                            <i className="fab fa-facebook-f" style={{ color: 'black' }}></i>
                        </IconButton>
                        <IconButton color="inherit">
                            <i className="fab fa-twitter" style={{ color: 'black' }}></i>
                        </IconButton>
                        <IconButton color="inherit">
                            <i className="fab fa-google" style={{ color: 'black' }}></i>
                        </IconButton>
                        <IconButton color="inherit">
                            <i className="fab fa-linkedin-in" style={{ color: 'black' }}></i>
                        </IconButton>
                        <IconButton color="inherit">
                            <i className="fab fa-instagram" style={{ color: 'black' }}></i>
                        </IconButton>
                        <IconButton color="inherit">
                            <i className="fab fa-github" style={{ color: 'black' }}></i>
                        </IconButton>
                        <IconButton color="inherit">
                            <i className="fab fa-skype" style={{ color: 'black' }}></i>
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </BackgroundContainer>
    );
};

export default Home;
