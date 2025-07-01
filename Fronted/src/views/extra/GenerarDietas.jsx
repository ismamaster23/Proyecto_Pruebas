import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import ComparisonChart from './ComparisonChart'; // Import the new component
import { useLocation, useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        width: '150%', // Set the width to 150% for medium and larger screens
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%', // Set the width to 100% for small screens
    },
    overflowX: 'auto', // Enable horizontal scrolling
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(4),
    maxHeight: 600, // Set a max height to enable vertical scrolling
}));

const CenteredTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const DietPlanTable = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { correo, peso, altura, actividadFisica, edad, sexo } = location.state;

    const [dietPlans, setDietPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                const response = await axios.get('https://pruebas-back-50777bb3ad67.herokuapp.com/obtener_elementos_algoritmo', {
                    params: {
                        altura,
                        peso,
                        actividad_fisica: actividadFisica,
                        sexo,
                        edad,
                    },
                });
                setDietPlans(response.data);
                setSelectedPlan(response.data[0]); // Set the first plan as default selected
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDietPlans();
    }, [altura, peso, actividadFisica, sexo, edad]);

    const handleRowClick = (plan) => {
        setSelectedPlan(plan);
    };

    const handleSaveDiet = async (plan) => {
        try {
            const response = await axios.post(`https://pruebas-back-50777bb3ad67.herokuapp.com/edit_dieta/${correo}`, {
                datosDieta: plan.individual
            });
            console.log(response.data);
            setSnackbarMessage('Datos guardados correctamente');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/pacientes');
            }, 2000);
        } catch (error) {
            console.error('Error saving diet plan:', error);
            setSnackbarMessage('Error al guardar los datos');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    if (error) {
        return <Typography>Error cargando el plan de dietas</Typography>;
    }

    const klcaData = selectedPlan ? {
        labels: ['Original', 'Calculated'],
        datasets: [
            {
                label: 'KLCA Total',
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
                data: [
                    selectedPlan.original_klca_tot,
                    selectedPlan.klca_total,
                ],
            }
        ]
    } : { labels: [], datasets: [] };

    const lipidosData = selectedPlan ? {
        labels: ['Original', 'Calculated'],
        datasets: [
            {
                label: 'Lipidos Total',
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
                data: [
                    selectedPlan.original_lipidos_tot,
                    selectedPlan.lipidos_total,
                ],
            }
        ]
    } : { labels: [], datasets: [] };

    const hcoData = selectedPlan ? {
        labels: ['Original', 'Calculated'],
        datasets: [
            {
                label: 'HCO2 Total',
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
                data: [
                    selectedPlan.original_hco_tot,
                    selectedPlan.hco2_total,
                ],
            }
        ]
    } : { labels: [], datasets: [] };

    const proteinasData = selectedPlan ? {
        labels: ['Original', 'Calculated'],
        datasets: [
            {
                label: 'Proteinas Total',
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
                data: [
                    selectedPlan.original_proteina_tot,
                    selectedPlan.proteinas_total,
                ],
            }
        ]
    } : { labels: [], datasets: [] };

    return (
        <StyledContainer>
            <Card>
                <CardContent>
                    <CenteredTypography variant="h4" gutterBottom>
                        Planes dietéticos
                    </CenteredTypography>
                    <StyledTableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>HCO2 Total</TableCell>
                                    <TableCell>KLCA Total</TableCell>
                                    <TableCell>Lipidos Total</TableCell>
                                    <TableCell>Proteinas Total</TableCell>
                                    {dietPlans.length > 0 && Object.keys(dietPlans[0].individual).map((key) => (
                                        <TableCell key={key}>{key}</TableCell>
                                    ))}
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dietPlans.map((plan, index) => (
                                    <TableRow
                                        key={index}
                                        onClick={() => handleRowClick(plan)}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedPlan === plan ? '#e0e0e0' : 'transparent',
                                            border: selectedPlan === plan ? '2px solid black' : 'none'
                                        }}>
                                        <TableCell>{plan.hco2_total.toFixed(2)}</TableCell>
                                        <TableCell>{plan.klca_total.toFixed(2)}</TableCell>
                                        <TableCell>{plan.lipidos_total.toFixed(2)}</TableCell>
                                        <TableCell>{plan.proteinas_total.toFixed(2)}</TableCell>
                                        {Object.entries(plan.individual).map(([key, value]) => (
                                            <TableCell key={key}>
                                                {typeof value === 'number' ? value.toFixed(2) : value}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleSaveDiet(plan); }}>
                                                Guardar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <ComparisonChart data={klcaData} title="KLCA Comparación Total" />
                    <ComparisonChart data={lipidosData} title="Lipidos Comparación Total" />
                    <ComparisonChart data={hcoData} title="HCO2 Comparación Total" />
                    <ComparisonChart data={proteinasData} title="Proteinas Comparación Total" />
                </CardContent>
            </Card>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
};

export default DietPlanTable;
