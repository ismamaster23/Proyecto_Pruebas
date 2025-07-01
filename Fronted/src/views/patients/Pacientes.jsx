import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    TextField,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Pacientes = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCorreo, setSelectedCorreo] = useState(null);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const [dietaData, setDietaData] = useState(null);
    const [infoDialog, setInfoDialog] = useState(false);
    const navigate = useNavigate();
    const email = useSelector((state) => state.auth.email);

    const fetchRecords = async (query) => {
        try {
            const response = await axios.get(`https://pruebas-back-50777bb3ad67.herokuapp.com/obtener`, {
                params: { query, email }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setAlert({
                open: true,
                severity: 'error',
                message: `Error fetching data: ${error.message} (Code: ${error.response?.status})`
            });
            setSearchResults([]);
        }
    };    

    useEffect(() => {
        // Obtener todos los registros al cargar el componente
        fetchRecords('');
    }, []);

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        fetchRecords(value);
    };

    const handleAddPerson = () => {
        navigate('/paciente/new');
    };

    const handleEditPerson = (correo) => {
        navigate(`/paciente/update?correo=${correo}`);
    };

    const handleDeletePerson = (correo) => {
        setSelectedCorreo(correo);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`https://pruebas-back-50777bb3ad67.herokuapp.com/delete/${selectedCorreo}`);
            // Refrescar los registros después de eliminar
            fetchRecords(searchQuery);
        } catch (error) {
            console.error('Error deleting data:', error);
            setAlert({
                open: true,
                severity: 'error',
                message: `Error deleting data: ${error.message} (Code: ${error.response?.status})`
            });
        } finally {
            setOpenDialog(false);
            setSelectedCorreo(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
        setSelectedCorreo(null);
    };

    const handleInfoPerson = async (correo) => {
        try {
            const response = await axios.get(`https://pruebas-back-50777bb3ad67.herokuapp.com/obtener-paciente/${correo}`);
            if (response.data.datosDieta) {
                setDietaData(response.data.datosDieta);
                setInfoDialog(true);
            } else {
                setAlert({
                    open: true,
                    severity: 'warning',
                    message: 'Datos de dieta no encontrados'
                });
            }
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setAlert({
                open: true,
                severity: 'error',
                message: `Error fetching patient data: ${error.message} (Code: ${error.response?.status})`
            });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: '', message: '' });
    };

    const handleCloseInfoDialog = () => {
        setInfoDialog(false);
        setDietaData(null);
    };

    return (
        <>
            <Card sx={{ margin: 'auto', marginTop: 5, width: { xs: '100%', sm: '80%' } }}>
                <CardContent>
                    {alert.open && (
                        <Alert severity={alert.severity} onClose={handleCloseAlert} sx={{ marginBottom: 2 }}>
                            {alert.message}
                        </Alert>
                    )}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <TextField
                            label="Buscar correo electrónico "
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{ width: { xs: '100%', sm: '70%' } }}
                        />
                        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddPerson}>
                            Agregar persona
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellidos</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.apelPate + " " + row.apelMate}</TableCell>
                                        <TableCell>{row.correo}</TableCell>
                                        <TableCell align="right">
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <Tooltip title="Información">
                                                    <IconButton color="primary" onClick={() => handleInfoPerson(row.correo)}>
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Editar">
                                                    <IconButton color="primary" onClick={() => handleEditPerson(row.correo)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Borrar">
                                                    <IconButton color="secondary" onClick={() => handleDeletePerson(row.correo)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este registro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={infoDialog}
                onClose={handleCloseInfoDialog}
                aria-labelledby="info-dialog-title"
                aria-describedby="info-dialog-description"
            >
                <DialogTitle id="info-dialog-title" style={{ textAlign: 'center' }}>{"Información de la dieta diaria (Porciones alimenticias equivalentes)"}</DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    {dietaData ? (
                        <DialogContentText id="info-dialog-description">
                            {Object.entries(dietaData).map(([key, value]) => (
                                <div key={key}><strong>{key}:</strong> {value}</div>
                            ))}
                        </DialogContentText>
                    ) : (
                        <DialogContentText id="info-dialog-description">
                            No se encontraron datos de la dieta.
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseInfoDialog} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <br />
        </>
    );
};

export default Pacientes;
