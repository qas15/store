const { Order, OrderDevice, Device, User, Address } = require('../models/models');

const createOrder = async (req, res) => {
    try {
        const { devices, totalPrice, address } = req.body;
        const userId = req.user.id;
        if (!address) {
            return res.status(400).json({ error: 'Адрес обязателен' });
        }
        const order = await Order.create({
            totalPrice,
            userId,
        });
        const userAddress = await Address.create({
            userId,
            address,
            orderId: order.id,
        });
        const orderDevices = devices.map(device => ({
            orderId: order.id,
            deviceId: device.deviceId,
            price: device.price || 0,
        }));
        await OrderDevice.bulkCreate(orderDevices);

        return res.status(201).json({
            message: 'Заказ успешно создан',
            order,
            user: { id: userId },
            address: userAddress,
        });
    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        return res.status(500).json({ error: 'Произошла ошибка при создании заказа' });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email'],
                    include: [
                        {
                            model: Address,
                            as: 'address',
                        }
                    ]
                },
                {
                    model: OrderDevice,
                    as: 'orderDevices',
                    include: [
                        {
                            model: Device,
                            as: 'device',
                        }
                    ]
                },
                {
                    model: Address,
                    as: 'address',
                }
            ]
        });
        res.json(orders);
    } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
        res.status(500).json({ message: 'Ошибка при загрузке заказов' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await OrderDevice.destroy({ where: { orderId: id } });
        await Address.destroy({ where: { orderId: id } });
        await Order.destroy({ where: { id } });

        return res.json({ message: "Заказ удалён" });
    } catch (error) {
        console.error("Ошибка:", error);
        return res.status(500).json({ error: "Ошибка" });
    }
};
module.exports = { createOrder, getAllOrders, deleteOrder };




