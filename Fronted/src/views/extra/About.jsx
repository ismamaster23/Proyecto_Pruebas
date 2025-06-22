import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const AboutContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(5),
}));

const SectionCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    width: '100%',
    maxWidth: 900,
}));

const IncreasedTypography = styled(Typography)(({ theme }) => ({
    fontSize: '1.15rem',
}));

const AboutUs = () => {
    return (
        <AboutContainer>
            <Typography variant="h3" gutterBottom>
                Acerca de nosotros
            </Typography>
            <SectionCard>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Misión
                    </Typography>
                    <IncreasedTypography variant="body1">
                        Desarrollar un sistema web como herramienta de apoyo en la práctica profesional de los nutriólogos/as que facilite el cálculo dietético, brinde recomendaciones dietéticas, estime porciones alimenticias y lleve un historial del paciente para realizar un seguimiento más proactivo de sus avances y efectos del tratamiento. Asimismo, automatizar procesos de cálculos para reducir el margen de error y proporcionar recomendaciones dietéticas y menús alimenticios mediante Inteligencia Artificial.
                    </IncreasedTypography>
                </CardContent>
            </SectionCard>
            <SectionCard>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Visión
                    </Typography>
                    <IncreasedTypography variant="body1">
                        Implementar una herramienta especializada en nutrición en un sistema web que permita a los profesionales de la salud nutricional agilizar y optimizar su trabajo, mejorando la precisión en los cálculos y proporcionando un enfoque más práctico a la hora de hacer recomendaciones nutricionales y el seguimiento del paciente. Contribuir en la solución de problemas de salud asociados a hábitos alimenticios poco saludables y promover una mejor calidad de vida.
                    </IncreasedTypography>
                </CardContent>
            </SectionCard>
            <SectionCard>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Consentimiento Informado
                    </Typography>
                    <IncreasedTypography variant="body1">
                        Nos comprometemos a no hacer mal uso de la información personal de los pacientes. Todos los datos recopilados serán utilizados exclusivamente para proporcionar recomendaciones dietéticas, regímenes alimenticios y diagnósticos nutricionales, y para facilitar el seguimiento de los avances y efectos del tratamiento de los pacientes. La privacidad y la seguridad de la información de nuestros usuarios es nuestra prioridad.
                    </IncreasedTypography>
                </CardContent>
            </SectionCard>
            <SectionCard>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Términos y Condiciones
                    </Typography>
                    <IncreasedTypography variant="body1">
                        Este sistema web es una herramienta de trabajo para nutriólogos/as y no pretende reemplazar el juicio clínico y la experiencia de los profesionales de la salud. Las recomendaciones y cálculos proporcionados por el sistema deben ser interpretados y aplicados por un nutriólogo/a calificado. No nos responsabilizamos por decisiones tomadas basadas exclusivamente en los resultados del sistema sin la debida supervisión profesional.
                    </IncreasedTypography>
                    <IncreasedTypography variant="body1" style={{ marginTop: '1rem' }}>
                        Al utilizar este sistema, los usuarios aceptan que toda la información proporcionada será utilizada conforme a nuestras políticas de privacidad y que el sistema se utilizará únicamente para los fines previstos en la práctica profesional de la nutrición.
                    </IncreasedTypography>
                </CardContent>
            </SectionCard>
        </AboutContainer>
    );
};

export default AboutUs;
