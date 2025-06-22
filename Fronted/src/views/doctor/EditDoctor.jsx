import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
    maxWidth: '900px', // Ajusta el máximo para pantallas grandes
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
        width: '100%', // Ajusta el ancho para dispositivos móviles
        maxWidth: 'none',
    },
}));

const CardContentContainer = styled(CardContent)(({ theme }) => ({
    width: '100%',
    margin: '0 auto',
}));

const EditDoctorForm = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const email = useSelector((state) => state.auth.email);  // Obtener el correo electrónico del estado del store

    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        fechaNacimiento: '',
        ciudad: '',
        cedulaProfesional: '',
        sexo: '',
        correo: '',
        password_actual: '',
        password_nueva: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        // Cargar los datos actuales del doctor
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get('http://192.168.0.18:5000/api/obtener_doctor', { params: { correo: email } });
                setFormData({ ...response.data, password_actual: '', password_nueva: '', confirmPassword: '' });
            } catch (error) {
                console.error('Error al cargar los datos del doctor:', error);
            }
        };

        fetchDoctorData();
    }, [email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        let newErrors = { ...errors };

        if (name === 'telefono') {
            if (!/^\d*$/.test(value) || value.length > 10) {
                newErrors.telefono = "Solo se permiten caracteres numéricos y un máximo de 10 dígitos.";
            } else {
                delete newErrors.telefono;
            }
        }

        if (name === 'fechaNacimiento') {
            const currentDate = new Date();
            const selectedDate = new Date(value);
            const age = currentDate.getFullYear() - selectedDate.getFullYear();
            if (selectedDate > currentDate.setFullYear(currentDate.getFullYear() - 18) || selectedDate < currentDate.setFullYear(currentDate.getFullYear() - 100)) {
                newErrors.fechaNacimiento = "La fecha de nacimiento debe estar entre 18 y 100 años.";
            } else {
                delete newErrors.fechaNacimiento;
            }
        }

        if (name === 'confirmPassword' || name === 'password_nueva') {
            const { password_nueva, confirmPassword } = { ...formData, [name]: value };
            if (password_nueva && password_nueva !== confirmPassword) {
                setIsPasswordMatch(false);
                newErrors.confirmPassword = "Las contraseñas no coinciden.";
            } else {
                setIsPasswordMatch(true);
                delete newErrors.confirmPassword;
            }
        }

        setErrors(newErrors);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.nombre = formData.nombre ? "" : "Este campo es requerido.";
        tempErrors.apellidoPaterno = formData.apellidoPaterno ? "" : "Este campo es requerido.";
        tempErrors.apellidoMaterno = formData.apellidoMaterno ? "" : "Este campo es requerido.";
        tempErrors.telefono = formData.telefono ? "" : "Este campo es requerido.";
        tempErrors.fechaNacimiento = formData.fechaNacimiento ? "" : "Este campo es requerido.";
        tempErrors.ciudad = formData.ciudad ? "" : "Este campo es requerido.";
        tempErrors.cedulaProfesional = formData.cedulaProfesional ? "" : "Este campo es requerido.";
        tempErrors.sexo = formData.sexo ? "" : "Este campo es requerido.";
        if (formData.password_nueva && !formData.password_actual) {
            tempErrors.password_actual = "Este campo es requerido para cambiar la contraseña.";
        }
        if (formData.password_nueva && formData.password_nueva !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Las contraseñas no coinciden.";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate() && isPasswordMatch) {
            try {
                const response = await axios.put('http://192.168.0.18:5000/api/editar_doctor', { ...formData, correo: email });
                setSnackbarMessage('Datos actualizados con éxito');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                navigate('/pacientes'); // Redireccionar a la página de inicio después de actualizar el usuario
            } catch (error) {
                console.error('Error al actualizar los datos del doctor:', error.response?.data || error.message);
                setSnackbarMessage(`Error ${error.response?.status}: ${error.response?.data.message || error.message}`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <FormContainer>
            <StyledCard>
                <CardContentContainer>
                    <Typography variant="h4" align="center" gutterBottom>
                        Editar Información
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={isMobile ? 2 : 3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    variant="outlined"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    error={!!errors.nombre}
                                    helperText={errors.nombre}
                                    InputLabelProps={{
                                        style: { color: !!errors.nombre ? 'red' : '' }
                                    }}
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
                                    error={!!errors.apellidoPaterno}
                                    helperText={errors.apellidoPaterno}
                                    InputLabelProps={{
                                        style: { color: !!errors.apellidoPaterno ? 'red' : '' }
                                    }}
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
                                    error={!!errors.apellidoMaterno}
                                    helperText={errors.apellidoMaterno}
                                    InputLabelProps={{
                                        style: { color: !!errors.apellidoMaterno ? 'red' : '' }
                                    }}
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
                                    error={!!errors.telefono}
                                    helperText={errors.telefono}
                                    inputProps={{ maxLength: 10 }}
                                    InputLabelProps={{
                                        style: { color: !!errors.telefono ? 'red' : '' }
                                    }}
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
                                    error={!!errors.fechaNacimiento}
                                    helperText={errors.fechaNacimiento}
                                    InputLabelProps={{
                                        style: { color: !!errors.fechaNacimiento ? 'red' : '' }
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" error={!!errors.ciudad}>
                                    <InputLabel required style={{ color: !!errors.ciudad ? 'red' : '' }}>Ciudad</InputLabel>
                                    <Select
                                        label="Ciudad"
                                        name="ciudad"
                                        value={formData.ciudad}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="mexico">México</MenuItem>
                                        <MenuItem value="estado_mexico">Estado de México</MenuItem>
                                        <MenuItem value="puebla">Puebla</MenuItem>
                                        <MenuItem value="tlaxcala">Tlaxcala</MenuItem>
                                    </Select>
                                    {errors.ciudad && <Typography color="error">{errors.ciudad}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Cédula Profesional"
                                    variant="outlined"
                                    name="cedulaProfesional"
                                    value={formData.cedulaProfesional}
                                    onChange={handleChange}
                                    error={!!errors.cedulaProfesional}
                                    helperText={errors.cedulaProfesional}
                                    InputLabelProps={{
                                        style: { color: !!errors.cedulaProfesional ? 'red' : '' }
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" error={!!errors.sexo}>
                                    <InputLabel required style={{ color: !!errors.sexo ? 'red' : '' }}>Sexo</InputLabel>
                                    <Select
                                        label="Sexo"
                                        name="sexo"
                                        value={formData.sexo}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="hombre">Hombre</MenuItem>
                                        <MenuItem value="mujer">Mujer</MenuItem>
                                    </Select>
                                    {errors.sexo && <Typography color="error">{errors.sexo}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Correo Electrónico"
                                    variant="outlined"
                                    name="correo"
                                    value={formData.correo}
                                    disabled // No se puede cambiar el correo
                                    error={!!errors.correo}
                                    helperText={errors.correo}
                                    InputLabelProps={{
                                        style: { color: !!errors.correo ? 'red' : '' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Contraseña Actual"
                                    variant="outlined"
                                    type="password"
                                    name="password_actual"
                                    value={formData.password_actual}
                                    onChange={handleChange}
                                    error={!!errors.password_actual}
                                    helperText={errors.password_actual}
                                    InputLabelProps={{
                                        style: { color: !!errors.password_actual ? 'red' : '' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nueva Contraseña"
                                    variant="outlined"
                                    type="password"
                                    name="password_nueva"
                                    value={formData.password_nueva}
                                    onChange={handleChange}
                                    error={!!errors.password_nueva}
                                    helperText={errors.password_nueva}
                                    InputLabelProps={{
                                        style: { color: !!errors.password_nueva ? 'red' : '' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Confirmar Nueva Contraseña"
                                    variant="outlined"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputLabelProps={{
                                        style: { color: !!errors.confirmPassword ? 'red' : '' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        type="submit"
                                        disabled={!isPasswordMatch || Object.values(errors).some(error => error !== '')}
                                    >
                                        Enviar
                                    </Button>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </form>
                </CardContentContainer>
            </StyledCard>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </FormContainer>
    );
};

export default EditDoctorForm;
