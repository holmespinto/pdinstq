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

const Login2 = React.lazy(() => import('../pages/account2/Login2'));
const Logout2 = React.lazy(() => import('../pages/account2/Logout2'));
const Register2 = React.lazy(() => import('../pages/account2/Register2'));
const Confirm2 = React.lazy(() => import('../pages/account2/Confirm2'));
const ForgetPassword2 = React.lazy(() => import('../pages/account2/ForgetPassword2'));
const LockScreen2 = React.lazy(() => import('../pages/account2/LockScreen2'));

// dashboard
const ProjectDashboard = React.lazy(() => import('../pages/dashboard/Project'));
const calendario = React.lazy(() => import('../pages/dashboard/calendario'));


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


const appRoutes = [
    calendarioAppRoutes
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
    {
        path: '/account/login2',
        name: 'Login2',
        component: Login2,
        route: Route,
    },
    {
        path: '/account/logout2',
        name: 'Logout2',
        component: Logout2,
        route: Route,
    },
    {
        path: '/account/register2',
        name: 'Register2',
        component: Register2,
        route: Route,
    },
    {
        path: '/account/confirm2',
        name: 'Confirm2',
        component: Confirm2,
        route: Route,
    },
    {
        path: '/account/forget-password2',
        name: 'Forget Password2',
        component: ForgetPassword2,
        route: Route,
    },
    {
        path: '/account/lock-screen2',
        name: 'Lock Screen2',
        component: LockScreen2,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes, ...appRoutes];
const publicRoutes = [...authRoutes];
const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
