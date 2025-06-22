import React, { useState } from 'react';
import { Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Avatar, Typography, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

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

const SideCard = styled(Card)(({ theme }) => ({
    width: '100%',
    marginRight: theme.spacing(2),
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const CardContentContainer = styled(CardContent)(({ theme }) => ({
    width: '100%',
    margin: '0 auto',
}));

const Patient = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({
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
        aoaAAG: '',
        aoaBAG: '',
        aoaMAG: '',
        aoaMBAG: '',
        aceitesCP: '',
        aceitesSP: '',
        azucarSG: '',
        cerealesCG: '',
        cerealesSG: '',
        frutas: '',
        lecheCA: '',
        lecheDes: '',
        lecheEntera: '',
        lecheSemi: '',
        leguminosas: '',
        verduras: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'telefono') {
            if (!/^\d*$/.test(value) || value.length > 10) {
                setErrors({
                    ...errors,
                    telefono: "Solo se permiten caracteres numéricos y un máximo de 10 dígitos.",
                });
            } else {
                const newErrors = { ...errors };
                delete newErrors.telefono;
                setErrors(newErrors);
            }
        }

        if (name === 'fechaNacimiento') {
            const currentDate = new Date();
            const selectedDate = new Date(value);
            const age = currentDate.getFullYear() - selectedDate.getFullYear();
            if (selectedDate > currentDate.setFullYear(currentDate.getFullYear() - 18) || selectedDate < currentDate.setFullYear(currentDate.getFullYear() - 100)) {
                setErrors({
                    ...errors,
                    fechaNacimiento: "La fecha de nacimiento debe estar entre 18 y 100 años.",
                });
            } else {
                const newErrors = { ...errors };
                delete newErrors.fechaNacimiento;
                setErrors(newErrors);
            }
        }
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.nombre = formData.nombre ? "" : "Este campo es requerido.";
        tempErrors.apellidoPaterno = formData.apellidoPaterno ? "" : "Este campo es requerido.";
        tempErrors.apellidoMaterno = formData.apellidoMaterno ? "" : "Este campo es requerido.";
        tempErrors.correo = formData.correo ? "" : "Este campo es requerido.";
        tempErrors.telefono = formData.telefono ? "" : "Este campo es requerido.";
        tempErrors.fechaNacimiento = formData.fechaNacimiento ? "" : "Este campo es requerido.";
        tempErrors.sexo = formData.sexo ? "" : "Este campo es requerido.";
        tempErrors.actividadFisica = formData.actividadFisica ? "" : "Este campo es requerido.";
        tempErrors.peso = formData.peso ? "" : "Este campo es requerido.";
        tempErrors.altura = formData.altura ? "" : "Este campo es requerido.";
        tempErrors.circunferenciaBrazo = formData.circunferenciaBrazo ? "" : "Este campo es requerido.";
        tempErrors.pliegueTriceps = formData.pliegueTriceps ? "" : "Este campo es requerido.";
        tempErrors.acidoUrico = formData.acidoUrico ? "" : "Este campo es requerido.";
        tempErrors.albumina = formData.albumina ? "" : "Este campo es requerido.";
        tempErrors.colesterol = formData.colesterol ? "" : "Este campo es requerido.";
        tempErrors.globulina = formData.globulina ? "" : "Este campo es requerido.";
        tempErrors.hematocrito = formData.hematocrito ? "" : "Este campo es requerido.";
        tempErrors.proteinasTotales = formData.proteinasTotales ? "" : "Este campo es requerido.";
        tempErrors.tensionDiastolica = formData.tensionDiastolica ? "" : "Este campo es requerido.";
        tempErrors.trigliceridos = formData.trigliceridos ? "" : "Este campo es requerido.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Aquí puedes manejar el envío de los datos
            console.log(formData);
        }
    };

    const handleCancel = () => {
        // Aquí puedes manejar la acción de cancelar
        console.log('Cancelado');
    };

    const handleEdit = () => {
        // Aquí puedes manejar la acción de editar
        console.log('Editado');
    };

    const handleDelete = () => {
        // Aquí puedes manejar la acción de eliminar
        console.log('Eliminado');
    };

    return (
        <FormContainer>
            <Grid container spacing={isMobile ? 2 : 3}>
                <Grid item xs={12} md={4}>
                    <SideCard>
                        <CardContentContainer>
                            <Typography variant="h5" align="center" gutterBottom>
                                Porciones Ditéticas
                            </Typography>
                            <Grid container spacing={isMobile ? 2 : 3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="AOA AAG"
                                        variant="outlined"
                                        name="aoaAAG"
                                        value={formData.aoaAAG}
                                        onChange={handleChange}
                                        error={!!errors.aoaAAG}
                                        helperText={errors.aoaAAG}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="AOA BAG"
                                        variant="outlined"
                                        name="aoaBAG"
                                        value={formData.aoaBAG}
                                        onChange={handleChange}
                                        error={!!errors.aoaBAG}
                                        helperText={errors.aoaBAG}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="AOA MAG"
                                        variant="outlined"
                                        name="aoaMAG"
                                        value={formData.aoaMAG}
                                        onChange={handleChange}
                                        error={!!errors.aoaMAG}
                                        helperText={errors.aoaMAG}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="AOA MBAG"
                                        variant="outlined"
                                        name="aoaMBAG"
                                        value={formData.aoaMBAG}
                                        onChange={handleChange}
                                        error={!!errors.aoaMBAG}
                                        helperText={errors.aoaMBAG}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Aceites C/P"
                                        variant="outlined"
                                        name="aceitesCP"
                                        value={formData.aceitesCP}
                                        onChange={handleChange}
                                        error={!!errors.aceitesCP}
                                        helperText={errors.aceitesCP}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Aceites S/P"
                                        variant="outlined"
                                        name="aceitesSP"
                                        value={formData.aceitesSP}
                                        onChange={handleChange}
                                        error={!!errors.aceitesSP}
                                        helperText={errors.aceitesSP}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Azúcar S/G"
                                        variant="outlined"
                                        name="azucarSG"
                                        value={formData.azucarSG}
                                        onChange={handleChange}
                                        error={!!errors.azucarSG}
                                        helperText={errors.azucarSG}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Cereales C/G"
                                        variant="outlined"
                                        name="cerealesCG"
                                        value={formData.cerealesCG}
                                        onChange={handleChange}
                                        error={!!errors.cerealesCG}
                                        helperText={errors.cerealesCG}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Cereales S/G"
                                        variant="outlined"
                                        name="cerealesSG"
                                        value={formData.cerealesSG}
                                        onChange={handleChange}
                                        error={!!errors.cerealesSG}
                                        helperText={errors.cerealesSG}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Frutas"
                                        variant="outlined"
                                        name="frutas"
                                        value={formData.frutas}
                                        onChange={handleChange}
                                        error={!!errors.frutas}
                                        helperText={errors.frutas}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Leche C/A"
                                        variant="outlined"
                                        name="lecheCA"
                                        value={formData.lecheCA}
                                        onChange={handleChange}
                                        error={!!errors.lecheCA}
                                        helperText={errors.lecheCA}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Leche Des"
                                        variant="outlined"
                                        name="lecheDes"
                                        value={formData.lecheDes}
                                        onChange={handleChange}
                                        error={!!errors.lecheDes}
                                        helperText={errors.lecheDes}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Leche Entera"
                                        variant="outlined"
                                        name="lecheEntera"
                                        value={formData.lecheEntera}
                                        onChange={handleChange}
                                        error={!!errors.lecheEntera}
                                        helperText={errors.lecheEntera}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Leche Semi"
                                        variant="outlined"
                                        name="lecheSemi"
                                        value={formData.lecheSemi}
                                        onChange={handleChange}
                                        error={!!errors.lecheSemi}
                                        helperText={errors.lecheSemi}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Leguminosas"
                                        variant="outlined"
                                        name="leguminosas"
                                        value={formData.leguminosas}
                                        onChange={handleChange}
                                        error={!!errors.leguminosas}
                                        helperText={errors.leguminosas}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Verduras"
                                        variant="outlined"
                                        name="verduras"
                                        value={formData.verduras}
                                        onChange={handleChange}
                                        error={!!errors.verduras}
                                        helperText={errors.verduras}
                                    />
                                </Grid>
                            </Grid>
                        </CardContentContainer>
                    </SideCard>
                </Grid>
                <Grid item xs={12} md={8}>
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
                                            error={!!errors.nombre}
                                            helperText={errors.nombre}
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
                                            error={!!errors.correo}
                                            helperText={errors.correo}
                                            disabled
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined" error={!!errors.sexo}>
                                            <InputLabel>Sexo</InputLabel>
                                            <Select
                                                label="Sexo"
                                                name="sexo"
                                                value={formData.sexo}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="male">Hombre</MenuItem>
                                                <MenuItem value="female">Mujer</MenuItem>
                                                <MenuItem value="undefined">No definido</MenuItem>
                                            </Select>
                                            {errors.sexo && <Typography color="error">{errors.sexo}</Typography>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined" error={!!errors.actividadFisica}>
                                            <InputLabel>Actividad Física</InputLabel>
                                            <Select
                                                label="Actividad Física"
                                                name="actividadFisica"
                                                value={formData.actividadFisica}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="sedentario">Sedentario</MenuItem>
                                                <MenuItem value="poco_activo">Poco Activo</MenuItem>
                                                <MenuItem value="activo_moderacion">Activo con Moderación</MenuItem>
                                                <MenuItem value="activo">Activo</MenuItem>
                                                <MenuItem value="muy_activo">Muy Activo</MenuItem>
                                            </Select>
                                            {errors.actividadFisica && <Typography color="error">{errors.actividadFisica}</Typography>}
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
                                            error={!!errors.peso}
                                            helperText={errors.peso}
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
                                            error={!!errors.altura}
                                            helperText={errors.altura}
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
                                            error={!!errors.circunferenciaBrazo}
                                            helperText={errors.circunferenciaBrazo}
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
                                            error={!!errors.pliegueTriceps}
                                            helperText={errors.pliegueTriceps}
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
                                            error={!!errors.acidoUrico}
                                            helperText={errors.acidoUrico}
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
                                            error={!!errors.albumina}
                                            helperText={errors.albumina}
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
                                            error={!!errors.colesterol}
                                            helperText={errors.colesterol}
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
                                            error={!!errors.globulina}
                                            helperText={errors.globulina}
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
                                            error={!!errors.hematocrito}
                                            helperText={errors.hematocrito}
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
                                            error={!!errors.proteinasTotales}
                                            helperText={errors.proteinasTotales}
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
                                            error={!!errors.tensionDiastolica}
                                            helperText={errors.tensionDiastolica}
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
                                            error={!!errors.trigliceridos}
                                            helperText={errors.trigliceridos}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Grid container spacing={isMobile ? 2 : 3}>
                                                <Grid item xs={4}>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        fullWidth
                                                        onClick={handleCancel}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                        onClick={handleEdit}
                                                    >
                                                        Editar
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        fullWidth
                                                        onClick={handleDelete}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContentContainer>
                    </StyledCard>
                </Grid>
            </Grid>
        </FormContainer>
    );
};

export default Patient;
