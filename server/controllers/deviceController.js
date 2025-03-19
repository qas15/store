const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            let fileName = null;

            if (req.files?.img) {
                const { img } = req.files;
                fileName = uuid.v4() + ".jpg";
                await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }

            const device = await Device.create({ 
                name, 
                price, 
                brandId, 
                typeId, 
                img: fileName 
            });

            if (info) {
                try {
                    info = JSON.parse(info);
                    await Promise.all(info.map(i =>
                        DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: device.id
                        })
                    ));
                } catch (error) {
                    return next(ApiError.badRequest("Invalid JSON in 'info' field"));
                }
            }

            return res.json(device);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController();
