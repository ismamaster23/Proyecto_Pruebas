import React, { useState } from 'react';
import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Card, CardContent, Snackbar, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const NewUserForm = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

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
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        readConsent: false,
    });

    const [errors, setErrors] = useState({});
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
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

        if (name === 'confirmPassword' || name === 'password') {
            const { password, confirmPassword } = { ...formData, [name]: value };
            if (password !== confirmPassword) {
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
        tempErrors.correo = formData.correo ? "" : "Este campo es requerido.";
        tempErrors.password = formData.password ? "" : "Este campo es requerido.";
        tempErrors.confirmPassword = formData.confirmPassword ? "" : "Este campo es requerido.";
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Las contraseñas no coinciden.";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate() && isPasswordMatch && formData.acceptTerms && formData.readConsent) {
            try {
                const response = await axios.post('http://192.168.0.18:5000/api/guardar_doctor', formData);
                console.log(response.data);
                setSnackbarMessage('Registro guardado con éxito');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000); // Delay de 3 segundos antes de redirigir
            } catch (error) {
                console.error('Error al guardar el doctor:', error.response?.data || error.message);
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
                        Registrar Nuevo Usuario
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
                                        <MenuItem value="mexico">Ciudad de México</MenuItem>
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
                                    onChange={handleChange}
                                    error={!!errors.correo}
                                    helperText={errors.correo}
                                    InputLabelProps={{
                                        style: { color: !!errors.correo ? 'red' : '' }
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Contraseña"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputLabelProps={{
                                        style: { color: !!errors.password ? 'red' : '' }
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Confirmar Contraseña"
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
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.acceptTerms}
                                            onChange={handleChange}
                                            name="acceptTerms"
                                            color="primary"
                                        />
                                    }
                                    label="Acepta los términos y condiciones"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.readConsent}
                                            onChange={handleChange}
                                            name="readConsent"
                                            color="primary"
                                        />
                                    }
                                    label="He leído el consentimiento informado"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        type="submit"
                                        disabled={
                                            !isPasswordMatch ||
                                            Object.values(errors).some(error => error !== '') ||
                                            !formData.acceptTerms ||
                                            !formData.readConsent
                                        }
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

export default NewUserForm;
