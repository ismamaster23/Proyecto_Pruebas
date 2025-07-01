import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routesConfig from '../routes/routes.json';
import PrivateRoute from '../components/PrivateRoute';

const loadComponent = (componentPath) => {
    return React.lazy(() => import(`../views/${componentPath}`));
};

const generateRoutes = (routesArray, isAuthenticated) => {
    return routesArray.map((route, index) => {
        const Component = loadComponent(route.component);
        
        if (route.routes) {
            return (
                <Route key={index} path={route.path} element={<PrivateRoute />}>
                    {generateRoutes(route.routes, isAuthenticated)}
                </Route>
            );
        }

        if (!isAuthenticated && route.protected && route.path !== 'https://pruebas-back-50777bb3ad67.herokuapp.com/login' && route.path !== 'https://pruebas-back-50777bb3ad67.herokuapp.com/registrarDoctor' && route.path !== '/' && route.path !== 'https://pruebas-back-50777bb3ad67.herokuapp.com/manualUsuario' && route.path !== 'https://pruebas-back-50777bb3ad67.herokuapp.com/about') {
            return null;
        }

        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {isAuthenticated || !route.protected ? <Component /> : <Navigate to="https://pruebas-back-50777bb3ad67.herokuapp.com/login" />}
                    </React.Suspense>
                }
            />
        );
    });
};

const RouteProvider = () => {
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    return (
        <Routes>
            {generateRoutes(routesConfig.routes, isAuthenticated)}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default RouteProvider;
