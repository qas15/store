import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import "../styles/Auth.css";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            console.log("Данные после регистрации/входа:", data);

            user.setUser(data)
            user.setIsAuth(true)

            history(SHOP_ROUTE)
            window.location.reload();
        } catch (e) {
            alert(e.response?.data?.message || "Ошибка авторизации");
        }
    };


    return (
        <Container className="auth-container">
            <Card className="auth-card">
                <h2 className="auth-title">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="auth-form">
                    <Form.Control
                        className="auth-input"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="auth-input"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="auth-buttons">
                        {isLogin ? (
                            <div>
                                Нет аккаунта? <NavLink className="auth-link" to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт? <NavLink className="auth-link" to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        )}
                        <Button className="auth-btn" onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;