import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {

    const token = localStorage.getItem('token');
    let userId = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.id;
        } catch (error) {
            console.error("Ошибка при декодировании токена:", error);
        }
    }


    const storedGuestId = localStorage.getItem('guestId');
    const guestId = storedGuestId || uuidv4();

    if (!storedGuestId) {
        localStorage.setItem('guestId', guestId);
    }

    const currentUserId = userId || guestId;
    const storageKey = `basket_${currentUserId}`;

    const [basket, setBasket] = useState(() => {
        const savedBasket = localStorage.getItem(storageKey);
        return savedBasket ? JSON.parse(savedBasket) : [];
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(basket));
    }, [basket, storageKey]);

    const addToBasket = (device) => {
        const newItem = { ...device, basketId: uuidv4() };
        setBasket((prevBasket) => [...prevBasket, newItem]);
    };

    const removeFromBasket = (basketId) => {
        setBasket((prevBasket) => prevBasket.filter((item) => item.basketId !== basketId));
    };

    const clearBasket = () => {
        setBasket([]);
    };

    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket }}>
            {children}
        </BasketContext.Provider>
    );
};




