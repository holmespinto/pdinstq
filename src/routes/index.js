import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
//const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));

// dashboard
const ProjectDashboard = React.lazy(() => import('../pages/dashboard/Project'));
const calendario = React.lazy(() => import('../pages/dashboard/calendario'));
const configuracion = React.lazy(() => import('../pages/dashboard/configuracion'));


// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/project" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
        {
            path: '/dashboard/project',
            name: 'Project',
            component: ProjectDashboard,
            route: PrivateRoute,
        },{
            path: '/dashboard/calendario/:id',
            name: 'Calendario',
            component: calendario,
            route: PrivateRoute,
        },{
          path: '/dashboard/calendario',
          name: 'Calendario',
          component: calendario,
          route: PrivateRoute,
      },{
          path: '/dashboard/configuracion/:id',
          name: 'Configuracion',
          component: configuracion,
          route: PrivateRoute,
      }
    ],
};



const calendarioAppRoutes = {
    path: '/dashboard/calendario/',
    name: 'Calendario',
    route: calendario,
    roles: ['Admin'],
    icon: 'uil-briefcase',
    children: [
        {
            path: '/dashboard/calendario/:id/calendario',
            name: 'calendario',
            component: calendario,
            route: PrivateRoute,
        }
    ],
};

const configuracionAppRoutes = {
    path: '/dashboard/configuracion/',
    name: 'Configuracion',
    route: calendario,
    roles: ['Admin'],
    icon: 'uil-briefcase',
    children: [
        {
            path: '/dashboard/configuracion/:id/configuracion',
            name: 'Configuracion',
            component: calendario,
            route: PrivateRoute,
        }
    ],
};


const appRoutes = [
    calendarioAppRoutes,
    configuracionAppRoutes
];

// pages



// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// auth
const authRoutes = [
    {
        path: '/account/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/account/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/account/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/account/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/account/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes, ...appRoutes];
const publicRoutes = [...authRoutes];
const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
