import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    PAYMENT_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    ORDER_ROUTE
} from "./utils/consts";
import Admin from './pages/Admin'
import Basket from './pages/Basket'
import Auth from './pages/Auth'
import DevicePage from './pages/DevicePage'
import PaymentPage from '../src/pages/Payment'
import AdminOrders from '../src/pages/AdminOrders'

import Shop from './pages/Shop'


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: ORDER_ROUTE,
        Component: AdminOrders
    }
]

export const publicRoutes = [
    {
        path: PAYMENT_ROUTE,
        Component: PaymentPage
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    }
]