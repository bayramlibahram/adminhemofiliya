import React from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes, adminRoutes} from "../../routes";

const AppRoutes = ({isAuthenticated}) => {
    if (!isAuthenticated) {
        return (
            <Routes>
                {publicRoutes.map(route => {
                    return (
                        <Route key={route.path} path={route.path} element={route.component} exact={route.exact}/>
                    )
                })}

            </Routes>
        )
    }

    return (
        <Routes>
            {publicRoutes.map(route => {
                return (
                    <Route key={route.path} path={route.path} element={route.component} exact={route.exact}/>
                )
            })}

            {adminRoutes.map(route => {
                return (
                    <Route key={route.path} path={route.path} element={route.component} exact={route.exact}/>
                )
            })}
        </Routes>
    )
};

export default AppRoutes;