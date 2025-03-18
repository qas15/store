const Router = require('express')
const router = new Router()
const fs = require("fs");
const path = require("path");
const deviceController = require('../controllers/deviceController')
const {Device} = require("../models/models");
router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const device = await Device.findOne({ where: { id } });
        const imgPath = device.img;
        const fullImgPath = path.join(__dirname, "..", "static", imgPath);
        if (!device) {
            return res.status(404).json({ message: "Устройство не найдено" });
        }

        await device.destroy();
        if (fs.existsSync(fullImgPath)) {
            fs.unlinkSync(fullImgPath);
            console.log("УДАЛЕНО")
            console.log(fullImgPath)
        }
        return res.json({ message: "Устройство успешно удалено" });
    } catch (error) {
        return res.status(500).json({ message: "Ошибка при удалении устройства", error });
    }
});


module.exports = router