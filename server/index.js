require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const bcrypt = require('bcryptjs')
const {Rating, Device} = require("./models/models");
const {DataTypes} = require("sequelize"); // Для хеширования пароля
const { User } = models // Импортируем модель User
const {Order, OrderDevice} = require("./models/models");
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler) //middleware

const createAdminUser = async () => {
    try {
        const adminEmail = 'admino@example.com';
        const adminPassword = 'adminPassword';

        const adminExists = await User.findOne({ where: { email: adminEmail } });

        if (!adminExists) {

            const hashedPassword = await bcrypt.hash(adminPassword, 5);
            await User.create({
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
            });

            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};
app.use('/static', express.static(path.resolve(__dirname, 'static')));
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        await createAdminUser()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

router.post('/rate', async (req, res) => {
    const { userId, deviceId, newRating } = req.body;

    if (newRating < 1 || newRating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {

        let existingRating = await Rating.findOne({ where: { userId, deviceId } });

        if (existingRating) {
            existingRating.rate = parseFloat(newRating);
            await existingRating.save();
        } else {
            await Rating.create({
                userId,
                deviceId,
                rate: parseFloat(newRating),
            });
        }


        const allRatings = await Rating.findAll({ where: { deviceId } });
        const totalRating = allRatings.reduce((acc, rating) => acc + rating.rate, 0);
        const averageRating = parseFloat((totalRating / allRatings.length).toFixed(1));


        await Device.update(
            { rating: averageRating },
            { where: { id: deviceId } }
        );

        return res.json({ message: 'Rating updated successfully', newRating: averageRating });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);


start()





