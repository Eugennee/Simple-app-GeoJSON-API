const Store = require('../models/Store')
const connectDB = require('../config/db')

// @desc get all stores
// @route GET /api/v1/stores
// @access Public
exports.getStores = async(req, res, next) => {
    try {
        const stores = await Store.find()

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        })
    } catch (error) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

// @desc create a store
// @route POST /api/v1/stores
// @access Public
exports.addStore = async(req, res, next) => {
    try {
        const store = await Store.create(req.body)

        return res.status(200).json({
            success: true,
            data: store
        })
    } catch (error) {
        console.error(error)
        if(error.code === 11000) {
            return res.status(400).json({ error: 'This store is already exists' })
        }
        res.status(500).json({ error: 'Server error' })
    }
}