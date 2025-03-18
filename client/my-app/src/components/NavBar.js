import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, SHOP_ROUTE} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';


const NavBar = observer(() => {
    const { user } = useContext(Context);
    const history = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
    };


    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink
                    className="LOGO"
                    to={SHOP_ROUTE}
                >MarketBoom</NavLink>
                {user.isAuth ? (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        {user.user?.role === 'ADMIN' && (
                            <Button
                                variant="outline-light"
                                onClick={() => {
                                    history(ORDER_ROUTE);
                                }}
                            >
                                Orders
                            </Button>
                        )}
                        {user.user?.role === 'ADMIN' && (
                            <Button
                                variant="outline-light"
                                onClick={() => {
                                    history(ADMIN_ROUTE);
                                }}
                                className="ms-2"
                            >
                                Админ панель
                            </Button>
                        )}
                        <Button
                            variant="outline-light"
                            onClick={() => {
                                history('/basket');
                            }}
                            className="ms-2"
                        >
                            Корзина
                        </Button>

                        <Button
                            variant="outline-light"
                            onClick={logOut}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant="outline-light" onClick={() => history(LOGIN_ROUTE)}>
                            Авторизация
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>

    );
});

export default NavBar;









