const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.post('/Signin', async (req, res, next) => {
    try {
        const { email, phone } = req.body
        if (!email || !phone) {
            res.status(400).json({ message: "all fiels are required" })
        }
        res.status(200).json({ message: "success" })
    } catch (err) {
        console.log("something went wrong ", err)
        res.status(500).json({ message: "internal server error" })
    }
})

module.exports = router