import React, { useState, useEffect } from 'react';
import "../styles/AdminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/orders`);
            if (!response.ok) {
                throw new Error('Ошибка на сервере');
            }
            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Ошибка при загрузке заказов:', error);
            setError(error.message || 'Что-то пошло не так');
        } finally {
            setLoading(false);
        }
    };

    const completeOrder = async (orderId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/orders/${orderId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Не удалось выполнить заказ');
            }
            setOrders(orders.filter(order => order.id !== orderId));
            alert('Заказ доставлен и удалён!');
        } catch (error) {
            console.error('Ошибка при выполнении заказа:', error);
            alert('Ошибка при удалении заказа');
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="orders-container">
            {orders.map((order) => (
                <div key={order.id} className="order">
                    <h3>Заказ ID: {order.id}</h3>
                    <p className="total-price">Общая стоимость: {order.totalPrice}₽</p>
                    {order.address ? (
                        <div className="address">
                            <p>Пользователь Email: <span>{order.user.email}</span></p>
                            <p>Адрес: <span>{order.address.address}</span></p>
                        </div>
                    ) : (
                        <p className="no-address">Адрес не найден</p>
                    )}
                    <div className="order-devices">
                        <h4>Устройства:</h4>
                        <ul>
                            {order.orderDevices?.map((orderDevice) => (
                                <li key={orderDevice.id}>{orderDevice.device.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => completeOrder(order.id)} className="complete-order">Выполнить заказ</button>
                </div>
            ))}
        </div>
    );
};

export default AdminOrders;


















