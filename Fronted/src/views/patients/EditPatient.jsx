import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Avatar, Typography, Box, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Input = styled('input')({
    display: 'none',
});

const AvatarContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 150,
    height: 150,
    margin: '0 auto',
    '&:hover .overlay': {
        opacity: 1,
    },
    [theme.breakpoints.down('sm')]: {
        width: 100,
        height: 100,
    },
}));

const Overlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    borderRadius: '50%',
    textAlign: 'center',
});

const FormContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(2),
    overflow: 'hidden',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const CardContentContainer = styled(CardContent)(({ theme }) => ({
    width: '100%',
    margin: '0 auto',
}));

const EditPatient = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const correo = searchParams.get('correo');
    const email = useSelector((state) => state.auth.email);

    const [formData, setFormData] = useState({
        nutriologo: email,
        nombre: '',
        apelPate: '',
        apelMate: '',
        correo: '',
        numero: '',
        dateOfBirth: '',
        gender: '',
        weight: '',
        height: '',
        actiFisica: '',
        datosAntopometricos: {
            circunferencia_brazo: '',
            pliegue_triceps: '',
        },
        datosBiometricos: {
            acidoUrico: '',
            albumina: '',
            colesterol: '',
            globulina: '',
            hematocrito: '',
            proteinas: '',
            tension: '',
            triglicerido: '',
        },
        datosDieta: {
            'AOA AAG': '',
            'AOA BAG': '',
            'AOA MAG': '',
            'AOA MBAG': '',
            'Aceites C/P': '',
            'Aceites S/P': '',
            'Azucar S/G': '',
            'Cereales C/G': '',
            'Cereales S/G': '',
            'Frutas': '',
            'Leche C/A': '',
            'Leche Des': '',
            'Leche Entera': '',
            'Leche Semi': '',
            'Leguminosas': '',
            'Verduras': '',
        }
    });

    const [errors, setErrors] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (correo) {
            axios.get(`https://pruebas-back-50777bb3ad67.herokuapp.com/obtener-paciente/${correo}`)
                .then(response => {
                    const data = response.data;
                    setFormData({
                        nutriologo: email,
                        nombre: data.nombre || '',
                        apelPate: data.apelPate || '',
                        apelMate: data.apelMate || '',
                        correo: data.correo || '',
                        numero: data.numero || '',
                        dateOfBirth: data.dateOfBirth || '',
                        gender: data.gender || 'undefined',
                        weight: data.weight || '',
                        height: data.height || '',
                        actiFisica: data.actiFisica || 'sedentario',
                        circunferencia_brazo: data.datosAntopometricos?.circunferencia_brazo || '',
                        pliegue_triceps: data.datosAntopometricos?.pliegue_triceps || '',
                        acidoUrico: data.datosBiometricos?.acidoUrico || '',
                        albumina: data.datosBiometricos?.albumina || '',
                        colesterol: data.datosBiometricos?.colesterol || '',
                        globulina: data.datosBiometricos?.globulina || '',
                        hematocrito: data.datosBiometricos?.hematocrito || '',
                        proteinas: data.datosBiometricos?.proteinas || '',
                        tension: data.datosBiometricos?.tension || '',
                        triglicerido: data.datosBiometricos?.triglicerido || '',
                        aoaAAG: data.datosDieta?.['AOA AAG'] || '',
                        aoaBAG: data.datosDieta?.['AOA BAG'] || '',
                        aoaMAG: data.datosDieta?.['AOA MAG'] || '',
                        aoaMBAG: data.datosDieta?.['AOA MBAG'] || '',
                        aceitesCP: data.datosDieta?.['Aceites C/P'] || '',
                        aceitesSP: data.datosDieta?.['Aceites S/P'] || '',
                        azucarSG: data.datosDieta?.['Azucar S/G'] || '',
                        cerealesCG: data.datosDieta?.['Cereales C/G'] || '',
                        cerealesSG: data.datosDieta?.['Cereales S/G'] || '',
                        frutas: data.datosDieta?.['Frutas'] || '',
                        lecheCA: data.datosDieta?.['Leche C/A'] || '',
                        lecheDes: data.datosDieta?.['Leche Des'] || '',
                        lecheEntera: data.datosDieta?.['Leche Entera'] || '',
                        lecheSemi: data.datosDieta?.['Leche Semi'] || '',
                        leguminosas: data.datosDieta?.['Leguminosas'] || '',
                        verduras: data.datosDieta?.['Verduras'] || ''
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [correo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleDialogConfirm = () => {
        console.log(formData);
        setDialogOpen(false);
        axios.post(`/edit/${formData.correo}`, formData)
            .then(response => {
                setSnackbarMessage(response.data.message);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch(error => {
                const message = error.response?.data?.message || 'Error al actualizar los datos';
                setSnackbarMessage(message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                console.error('Error updating data:', error);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleRedirect = () => {
        navigate('/GenerarDietas', {
            state: {
                correo: formData.correo,
                peso: formData.weight,
                altura: formData.height,
                actividadFisica: formData.actiFisica,
                edad: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
                sexo: formData.gender,
            },
        });
    };

    return (
        <FormContainer>
            <StyledCard>
                <CardContentContainer>
                    <Typography variant="h4" align="center" gutterBottom>
                        Editar paciente
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={isMobile ? 2 : 3}>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={isMobile ? 2 : 3}>
                                    <Grid item xs={12}>
                                        <AvatarContainer>
                                            <Avatar
                                                alt="Preview"
                                                src="https://via.placeholder.com/150"
                                                sx={{ width: isMobile ? 100 : 150, height: isMobile ? 100 : 150 }}
                                            />
                                            <Overlay className="overlay">
                                                <label htmlFor="upload-photo" style={{ cursor: 'pointer' }}>
                                                    <Input accept="image/*" id="upload-photo" type="file" />
                                                    Cambiar foto
                                                </label>
                                            </Overlay>
                                        </AvatarContainer>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Nombre"
                                            variant="outlined"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.nombre ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Apellido paterno"
                                            variant="outlined"
                                            name="apelPate"
                                            value={formData.apelPate}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.apelPate ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Apellido materno"
                                            variant="outlined"
                                            name="apelMate"
                                            value={formData.apelMate}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.apelMate ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Correo"
                                            variant="outlined"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.correo ? true : undefined }}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Número de teléfono"
                                            variant="outlined"
                                            name="numero"
                                            value={formData.numero}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.numero ? true : undefined }}
                                            inputProps={{ maxLength: 10 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Fecha de nacimiento"
                                            variant="outlined"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel shrink={formData.gender ? true : undefined}>Sexo</InputLabel>
                                            <Select
                                                label="Sexo"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="hombre">Hombre</MenuItem>
                                                <MenuItem value="mujer">Mujer</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel shrink={formData.actiFisica ? true : undefined}>Actividad física</InputLabel>
                                            <Select
                                                label="Actividad física"
                                                name="actiFisica"
                                                value={formData.actiFisica}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="sedentario">Sedentario</MenuItem>
                                                <MenuItem value="poco activo">Poco activo</MenuItem>
                                                <MenuItem value="activo moderacion">Activo con moderación</MenuItem>
                                                <MenuItem value="activo">Activo</MenuItem>
                                                <MenuItem value="muy activo">Muy activo</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Peso (kg)"
                                            variant="outlined"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.weight ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Altura (cm)"
                                            variant="outlined"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.height ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Circunferencia del brazo (cm)"
                                            variant="outlined"
                                            name="circunferencia_brazo"
                                            value={formData.circunferencia_brazo}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.circunferencia_brazo ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Pliegue cutáneo del tríceps (mm)"
                                            variant="outlined"
                                            name="pliegue_triceps"
                                            value={formData.pliegue_triceps}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.pliegue_triceps ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Ácido úrico (mg/dL)"
                                            variant="outlined"
                                            name="acidoUrico"
                                            value={formData.acidoUrico}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.acidoUrico ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Albúmina (g/dL)"
                                            variant="outlined"
                                            name="albumina"
                                            value={formData.albumina}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.albumina ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Colesterol (mg/dL)"
                                            variant="outlined"
                                            name="colesterol"
                                            value={formData.colesterol}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.colesterol ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Globulina (g/dL)"
                                            variant="outlined"
                                            name="globulina"
                                            value={formData.globulina}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.globulina ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Hematocrito (%)"
                                            variant="outlined"
                                            name="hematocrito"
                                            value={formData.hematocrito}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.hematocrito ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Proteínas totales (g/dL)"
                                            variant="outlined"
                                            name="proteinas"
                                            value={formData.proteinas}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.proteinas ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Tensión diastólica (mmHg)"
                                            variant="outlined"
                                            name="tension"
                                            value={formData.tension}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.tension ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Triglicéridos (mg/dL)"
                                            variant="outlined"
                                            name="triglicerido"
                                            value={formData.triglicerido}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.triglicerido ? true : undefined }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h5" align="center" gutterBottom>
                                    Porciones dietéticas
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="AOA AAG"
                                            variant="outlined"
                                            name="aoaAAG"
                                            value={formData.aoaAAG}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.aoaAAG ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="AOA BAG"
                                            variant="outlined"
                                            name="aoaBAG"
                                            value={formData.aoaBAG}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.aoaBAG ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="AOA MAG"
                                            variant="outlined"
                                            name="aoaMAG"
                                            value={formData.aoaMAG}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.aoaMAG ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="AOA MBAG"
                                            variant="outlined"
                                            name="aoaMBAG"
                                            value={formData.aoaMBAG}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.aoaMBAG ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Aceites C/P"
                                            variant="outlined"
                                            name="aceitesCP"
                                            value={formData.aceitesCP}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.aceitesCP ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Aceites S/P"
                                            variant="outlined"
                                            name="aceitesSP"
                                            value={formData.aceitesSP}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.aceitesSP ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Azúcar S/G"
                                            variant="outlined"
                                            name="azucarSG"
                                            value={formData.azucarSG}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.azucarSG ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Cereales C/G"
                                            variant="outlined"
                                            name="cerealesCG"
                                            value={formData.cerealesCG}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.cerealesCG ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Cereales S/G"
                                            variant="outlined"
                                            name="cerealesSG"
                                            value={formData.cerealesSG}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.cerealesSG ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Frutas"
                                            variant="outlined"
                                            name="frutas"
                                            value={formData.frutas}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.frutas ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Leche C/A"
                                            variant="outlined"
                                            name="lecheCA"
                                            value={formData.lecheCA}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.lecheCA ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Leche desnatada"
                                            variant="outlined"
                                            name="lecheDes"
                                            value={formData.lecheDes}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.lecheDes ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Leche entera"
                                            variant="outlined"
                                            name="lecheEntera"
                                            value={formData.lecheEntera}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.lecheEntera ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Leche semi"
                                            variant="outlined"
                                            name="lecheSemi"
                                            value={formData.lecheSemi}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.lecheSemi ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Leguminosas"
                                            variant="outlined"
                                            name="leguminosas"
                                            value={formData.leguminosas}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.leguminosas ? true : undefined }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Verduras"
                                            variant="outlined"
                                            name="verduras"
                                            value={formData.verduras}
                                            onChange={handleChange}
                                            InputLabelProps={{ shrink: formData.verduras ? true : undefined }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                    >
                                        Guardar
                                    </Button>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={handleRedirect}
                                    >
                                        Ir a planes de dieta
                                    </Button>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </form>
                </CardContentContainer>
            </StyledCard>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar edición"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro que desea guardar los cambios?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDialogConfirm} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </FormContainer>
    );
};

export default EditPatient;
