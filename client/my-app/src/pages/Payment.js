import '../styles/PaymentPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import { SHOP_ROUTE } from '../utils/consts';
import axios from 'axios';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
    const { basket, clearBasket } = useBasket();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentMessage, setPaymentMessage] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);

    const handlePayment = async () => {
        if (!address) {
            setPaymentMessage('Пожалуйста, введите ваш адрес.');
            setPaymentStatus('error');
            return;
        }

        const isPaymentSuccessful = true;

        if (isPaymentSuccessful) {
            setPaymentMessage('Заказ прошел успешно!');
            setPaymentStatus('success');
            clearBasket();

            try {

                if (basket.length === 0) {
                    throw new Error('Корзина пуста');
                }

                const devices = basket.map(item => ({ deviceId: item.id }));

                console.log('Devices:', devices);
                console.log('Total Price:', totalPrice);

                const response = await axios.post(`${process.env.REACT_APP_API_URL}api/orders/create`, {
                    devices: devices.map(device => ({
                        deviceId: device.deviceId,
                        price: device.price || 0,
                    })),
                    totalPrice: totalPrice,
                    address: address,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log("Адрес перед отправкой заказа:", address);

                console.log('Ответ сервера:', response.data);


                setPaymentMessage('Ваш заказ был успешно создан!');
                setPaymentStatus('success');

            } catch (error) {
                console.error("Ошибка при создании заказа:", error);
                setPaymentMessage(error.message || 'Ошибка при создании заказа');
                setPaymentStatus('error');
            }


            setTimeout(() => {
                navigate(SHOP_ROUTE);
            }, 200);

        } else {
            setPaymentMessage('Ошибка при оплате');
            setPaymentStatus('error');
        }
    };

    return (
        <div className="payment-page">
            <h2>Оформление заказа</h2>

            <div className="payment-items">
                <h3>Товары в заказе:</h3>
                <ul>
                    {basket.map((item) => (
                        <li key={item.id} className="payment-item">
                            {item.name} - {item.price} ₽
                        </li>
                    ))}
                </ul>
            </div>

            <div className="total-price">
                <h3>Итого: <strong>{totalPrice} ₽</strong></h3>
            </div>

            <div className="address-input">
                <label htmlFor="address">Введите ваш адрес:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Введите ваш адрес"
                />
            </div>

            <div className="payment-instruction">
                <p><strong>Важно:</strong> После оформления заказа и перехода к оплате, выберите способ оплаты «Наличные при получении». Ваши товары будут доставлены по указанному адресу. При получении заказа передайте курьеру нужную сумму. Пожалуйста, убедитесь, что все товары в заказе верны и в хорошем состоянии. Благодарим за покупку!</p>
            </div>

            {paymentStatus === 'success' && (
                <p className="success-message">{paymentMessage}</p>
            )}

            {paymentStatus === 'error' && (
                <p className="error-message">{paymentMessage}</p>
            )}

            <button onClick={handlePayment} className="payment-btn">
                Заказать
            </button>
        </div>
    );
};

export default PaymentPage;








