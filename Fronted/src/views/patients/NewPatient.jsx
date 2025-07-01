import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Avatar, Typography, Box, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    width: '150%',
    maxWidth: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const CardContentContainer = styled(CardContent)(({ theme }) => ({
    width: '100%',
    margin: '0 auto',
}));

const NewPatient = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const emailNutriologo = useSelector((state) => state.auth.email);

    const [formData, setFormData] = useState({
        nutriologo: emailNutriologo,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        telefono: '',
        fechaNacimiento: '',
        sexo: '',
        actividadFisica: '',
        peso: '',
        altura: '',
        circunferenciaBrazo: '',
        pliegueTriceps: '',
        acidoUrico: '',
        albumina: '',
        colesterol: '',
        globulina: '',
        hematocrito: '',
        proteinasTotales: '',
        tensionDiastolica: '',
        trigliceridos: '',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [showMigrationButtons, setShowMigrationButtons] = useState(false);
    const [correoToEdit, setCorreoToEdit] = useState('');

    useEffect(() => {
        setIsSubmitDisabled(!validateForm());
    }, [formData, errors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setTouched({
            ...touched,
            [name]: true,
        });

        let tempErrors = { ...errors };

        if (name === 'telefono') {
            if (!/^\d*$/.test(value) || value.length > 10) {
                tempErrors.telefono = "Solo se permiten caracteres numéricos y un máximo de 10 dígitos.";
            } else {
                delete tempErrors.telefono;
            }
        }

        if (name === 'fechaNacimiento') {
            const currentDate = new Date();
            const selectedDate = new Date(value);
            const age = currentDate.getFullYear() - selectedDate.getFullYear();
            if (selectedDate > currentDate.setFullYear(currentDate.getFullYear() - 18) || selectedDate < currentDate.setFullYear(currentDate.getFullYear() - 100)) {
                tempErrors.fechaNacimiento = "La fecha de nacimiento debe estar entre 18 y 100 años.";
            } else {
                delete tempErrors.fechaNacimiento;
            }
        }

        if (value.trim() === '') {
            tempErrors[name] = "Este campo es requerido.";
        } else {
            delete tempErrors[name];
        }

        setErrors(tempErrors);
    };

    const validateForm = () => {
        let tempErrors = {};
        if (formData.nombre !== undefined) tempErrors.nombre = formData.nombre ? "" : "Este campo es requerido.";
        if (formData.apellidoPaterno !== undefined) tempErrors.apellidoPaterno = formData.apellidoPaterno ? "" : "Este campo es requerido.";
        if (formData.apellidoMaterno !== undefined) tempErrors.apellidoMaterno = formData.apellidoMaterno ? "" : "Este campo es requerido.";
        if (formData.correo !== undefined) tempErrors.correo = formData.correo ? "" : "Este campo es requerido.";
        if (formData.telefono !== undefined) tempErrors.telefono = formData.telefono ? "" : "Este campo es requerido.";
        if (formData.fechaNacimiento !== undefined) tempErrors.fechaNacimiento = formData.fechaNacimiento ? "" : "Este campo es requerido.";
        if (formData.sexo !== undefined) tempErrors.sexo = formData.sexo ? "" : "Este campo es requerido.";
        if (formData.actividadFisica !== undefined) tempErrors.actividadFisica = formData.actividadFisica ? "" : "Este campo es requerido.";
        if (formData.peso !== undefined) tempErrors.peso = formData.peso ? "" : "Este campo es requerido.";
        if (formData.altura !== undefined) tempErrors.altura = formData.altura ? "" : "Este campo es requerido.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const validFormData = {
                nutriologo: emailNutriologo,
                nombre: formData.nombre || '',
                apelPate: formData.apellidoPaterno || '',
                apelMate: formData.apellidoMaterno || '',
                correo: formData.correo || '',
                numero: formData.telefono || '',
                dateOfBirth: formData.fechaNacimiento || '',
                gender: formData.sexo || '',
                actiFisica: formData.actividadFisica || '',
                weight: formData.peso || '',
                height: formData.altura || '',
                circunferencia_brazo: formData.circunferenciaBrazo || '',
                pliegue_triceps: formData.pliegueTriceps || '',
                acidoUrico: formData.acidoUrico || '',
                albumina: formData.albumina || '',
                colesterol: formData.colesterol || '',
                globulina: formData.globulina || '',
                hematocrito: formData.hematocrito || '',
                proteinas: formData.proteinasTotales || '',
                tension: formData.tensionDiastolica || '',
                triglicerido: formData.trigliceridos || '',
            };

            axios.post('https://pruebas-back-50777bb3ad67.herokuapp.com/api/guardar_datos', validFormData)
                .then(response => {
                    setDialogTitle('Éxito');
                    setDialogMessage('Datos guardados exitosamente');
                    setDialogOpen(true);
                    setShowMigrationButtons(false);
                })
                .catch(error => {
                    console.error('Hubo un error al guardar los datos:', error);
                    const message = error.response?.data?.message || 'Hubo un error al guardar los datos';
                    setDialogTitle('Error');
                    setDialogMessage(message);
                    setDialogOpen(true);

                    if (error.response?.status === 400) {
                        setShowMigrationButtons(true);
                        setDialogMessage('El paciente ya está registrado. ¿El paciente está de acuerdo con migrar su historial?');
                        setCorreoToEdit(formData.correo);
                    } else {
                        setShowMigrationButtons(false);
                    }
                });
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        if (dialogTitle === 'Éxito') {
            navigate('/generarDietas', {
                state: {
                    correo: formData.correo,
                    peso: formData.peso,
                    altura: formData.altura,
                    actividadFisica: formData.actividadFisica,
                    edad: new Date().getFullYear() - new Date(formData.fechaNacimiento).getFullYear(),
                    sexo: formData.sexo,
                }
            });
        }
    };

    const handleCancel = () => {
        setDialogOpen(false);
        navigate('/pacientes');
    };

    const handleAcceptMigration = () => {
        axios.patch(`https://pruebas-back-50777bb3ad67.herokuapp.com/api/modificar_nutriologo/${correoToEdit}`, { nutriologo: emailNutriologo })
            .then(response => {
                setDialogTitle('Éxito');
                setDialogMessage('Nutriólogo actualizado con éxito');
                setDialogOpen(true);
                setShowMigrationButtons(false);
                navigate('/pacientes');
            })
            .catch(error => {
                console.error('Hubo un error al actualizar el nutriólogo:', error);
                const message = error.response?.data?.message || 'Hubo un error al actualizar el nutriólogo';
                setDialogTitle('Error');
                setDialogMessage(message);
                setDialogOpen(true);
            });
    };

    return (
        <FormContainer>
            <StyledCard>
                <CardContentContainer>
                    <Typography variant="h4" align="center" gutterBottom>
                        Nuevo Paciente
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                                            Cambiar Foto
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
                                    onBlur={handleBlur}
                                    error={touched.nombre && !!errors.nombre}
                                    helperText={touched.nombre && errors.nombre}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Apellido Paterno"
                                    variant="outlined"
                                    name="apellidoPaterno"
                                    value={formData.apellidoPaterno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.apellidoPaterno && !!errors.apellidoPaterno}
                                    helperText={touched.apellidoPaterno && errors.apellidoPaterno}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Apellido Materno"
                                    variant="outlined"
                                    name="apellidoMaterno"
                                    value={formData.apellidoMaterno}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.apellidoMaterno && !!errors.apellidoMaterno}
                                    helperText={touched.apellidoMaterno && errors.apellidoMaterno}
                                    required
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
                                    onBlur={handleBlur}
                                    error={touched.correo && !!errors.correo}
                                    helperText={touched.correo && errors.correo}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Número de Teléfono"
                                    variant="outlined"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.telefono && !!errors.telefono}
                                    helperText={touched.telefono && errors.telefono}
                                    inputProps={{ maxLength: 10 }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Fecha de Nacimiento"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    name="fechaNacimiento"
                                    value={formData.fechaNacimiento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.fechaNacimiento && !!errors.fechaNacimiento}
                                    helperText={touched.fechaNacimiento && errors.fechaNacimiento}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" error={touched.sexo && !!errors.sexo}>
                                    <InputLabel>Sexo</InputLabel>
                                    <Select
                                        label="Sexo"
                                        name="sexo"
                                        value={formData.sexo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    >
                                        <MenuItem value="hombre">Hombre</MenuItem>
                                        <MenuItem value="mujer">Mujer</MenuItem>
                                    </Select>
                                    {touched.sexo && errors.sexo && <Typography color="error">{errors.sexo}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" error={touched.actividadFisica && !!errors.actividadFisica}>
                                    <InputLabel>Actividad Física</InputLabel>
                                    <Select
                                        label="Actividad Física"
                                        name="actividadFisica"
                                        value={formData.actividadFisica}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    >
                                        <MenuItem value="sedentario">Sedentario</MenuItem>
                                        <MenuItem value="poco activo">Poco Activo</MenuItem>
                                        <MenuItem value="activo moderacion">Activo con Moderación</MenuItem>
                                        <MenuItem value="activo">Activo</MenuItem>
                                        <MenuItem value="muy activo">Muy Activo</MenuItem>
                                    </Select>
                                    {touched.actividadFisica && errors.actividadFisica && <Typography color="error">{errors.actividadFisica}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Peso (kg)"
                                    variant="outlined"
                                    name="peso"
                                    value={formData.peso}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.peso && !!errors.peso}
                                    helperText={touched.peso && errors.peso}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Altura (cm)"
                                    variant="outlined"
                                    name="altura"
                                    value={formData.altura}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.altura && !!errors.altura}
                                    helperText={touched.altura && errors.altura}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Circunferencia del Brazo (cm)"
                                    variant="outlined"
                                    name="circunferenciaBrazo"
                                    value={formData.circunferenciaBrazo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Pliegue Cutáneo del Tríceps (mm)"
                                    variant="outlined"
                                    name="pliegueTriceps"
                                    value={formData.pliegueTriceps}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Ácido Úrico (mg/dL)"
                                    variant="outlined"
                                    name="acidoUrico"
                                    value={formData.acidoUrico}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Albumina (g/dL)"
                                    variant="outlined"
                                    name="albumina"
                                    value={formData.albumina}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Proteínas Totales (g/dL)"
                                    variant="outlined"
                                    name="proteinasTotales"
                                    value={formData.proteinasTotales}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tensión Diastólica (mmHg)"
                                    variant="outlined"
                                    name="tensionDiastolica"
                                    value={formData.tensionDiastolica}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Triglicéridos (mg/dL)"
                                    variant="outlined"
                                    name="trigliceridos"
                                    value={formData.trigliceridos}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        type="submit"
                                        disabled={isSubmitDisabled}
                                    >
                                        Enviar
                                    </Button>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </form>
                </CardContentContainer>
            </StyledCard>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {showMigrationButtons ? (
                        <>
                            <Button onClick={handleAcceptMigration} color="primary">Aceptar</Button>
                            <Button onClick={handleCancel} color="secondary">Cancelar</Button>
                        </>
                    ) : (
                        <Button onClick={handleDialogClose} color="primary">Aceptar</Button>
                    )}
                </DialogActions>
            </Dialog>
        </FormContainer>
    );
};

export default NewPatient;
