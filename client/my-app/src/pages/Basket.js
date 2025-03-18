import React from 'react';
import { useBasket } from '../context/BasketContext';
import '../styles/BasketPage.css';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_ROUTE } from "../utils/consts";


const BasketPage = () => {
    const { basket, removeFromBasket } = useBasket();

    const navigate = useNavigate();
    const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => {
        navigate(PAYMENT_ROUTE);
    };

    return (
        <div className="basket-container">
            <h2 className="basket-title">🛒 Корзина</h2>

            {basket.length === 0 ? (
                <p className="empty-message">Корзина пуста</p>
            ) : (
                <div className="basket-items">
                    {basket.map((device) => (
                        <div className="basket-item" key={device.basketId}>
                            <img className="basket-item-img" src={process.env.REACT_APP_API_URL + device.img} />
                            <div className="basket-item-info">
                                <h4>{device.name}</h4>
                                <p>{device.price} ₽</p>
                            </div>
                            <button className="remove-btn" onClick={() => removeFromBasket(device.basketId)}>Удалить</button>
                        </div>
                    ))}
                </div>
            )}


            {basket.length > 0 && (
                <footer className="basket-footer">
                    <div className="total-price">
                        Итого: <strong>{totalPrice} ₽</strong>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Оформить заказ
                    </button>
                </footer>
            )}
        </div>
    );
};

export default BasketPage;










