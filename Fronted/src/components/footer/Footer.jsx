import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/system';

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4, 0),
    position: 'relative',
    bottom: 0,
    width: '100%',
}));

const Footer = () => {
    const theme = useTheme();

    return (
        <FooterContainer>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            EDUCACIÓN
                        </Typography>
                        <Typography variant="body2" color="inherit">
                            SECRETARÍA DE EDUCACIÓN PÚBLICA
                        </Typography>
                        <Typography variant="body2" color="inherit">
                            www.gob.mx/SEP/
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            INSTITUTO POLITÉCNICO NACIONAL
                        </Typography>
                        <Typography variant="body2" color="inherit">
                           Instituto Politécnico Nacional (IPN). Av. Té 950, Granjas México, Iztacalco, 08400 Ciudad de México, CDMX, Ciudad de México.
                        </Typography>
                        <Typography variant="body2" color="inherit">
                            Esta página es una obra intelectual protegida por la Ley Federal del Derecho de Autor, puede ser reproducida con fines no lucrativos, siempre y cuando no se mutile, se cite la fuente completa y su dirección electrónica; su uso para otros fines, requiere autorización previa y por escrito de la Dirección General del Instituto.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="inherit" align="center">
                            &copy; {new Date().getFullYear()} Instituto Politécnico Nacional - Unidad Profesiona Interdiciplinaria de Ingenieria y Ciencias Sociales y Administrativas. Todos los derechos reservados.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </FooterContainer>
    );
};

export default Footer;
