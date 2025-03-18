import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar';
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { BasketProvider } from './context/BasketContext';

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            check()
                .then(data => {
                    console.log("Ответ сервера в check():", data);
                    if (data) {
                        user.setUser(data);
                        user.setIsAuth(true);
                    } else {
                        user.setUser({});
                        user.setIsAuth(false);
                    }
                })
                .catch(() => {
                    user.setUser({});
                    user.setIsAuth(false);
                    localStorage.removeItem("token");
                })
                .finally(() => setLoading(false));
        } else {
            user.setUser({});
            user.setIsAuth(false);
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <Spinner animation={'grow'} />;
    }

    return (
        <BasketProvider>
            <BrowserRouter>
                <NavBar />
                <AppRouter />
            </BrowserRouter>
        </BasketProvider>
    );
});

export default App;










