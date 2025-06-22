import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RouteProvider from './providers/RouterProvider.js';
import { BrowserRouter } from 'react-router-dom';
import NestedList from './components/menu/NestedList.jsx';
import Footer from './components/footer/Footer.jsx';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';

const theme = createTheme({
    palette: {
        primary: {
            main: '#778c43',
            contrastText: '#fff',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <NestedList />
                    <Box mt={2} sx={{ minHeight: 'calc(100vh - 100px)' }}>
                        <RouteProvider />
                    </Box>
                    <Footer />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
