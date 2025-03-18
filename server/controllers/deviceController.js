const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../middleware/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            console.log("Запрос на создание устройства:", req.body);

            let { name, price, brandId, typeId, info } = req.body;

            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest("Файл изображения обязателен"));
            }
            const { img } = req.files;

            console.log("Файл изображения получен:", img.name);

            const staticPath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(staticPath)) {
                fs.mkdirSync(staticPath, { recursive: true });
            }

            let fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve(staticPath, fileName);

            img.mv(filePath, (err) => {
                if (err) {
                    return next(ApiError.badRequest("Ошибка при загрузке изображения"));
                }
            });

            console.log("Изображение сохранено успешно!");

            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            console.log("Устройство создано:", device);

            if (info) {
                try {
                    info = JSON.parse(info);

                    for (const i of info) {
                        await DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: device.id
                        });
                    }
                    console.log("Информация о девайсе добавлена!");
                } catch (error) {
                    return next(ApiError.badRequest("Ошибка парсинга info"));
                }
            }

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController();
