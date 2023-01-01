const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const shortid = require('shortid')
const slugify = require('slugify')
const Address = require('../models/Address')
const { isValidObjectId } = require('mongoose')
const User = require('../models/User')
const sendEmailOrder = require('./SendmailOrderController')
var ObjectId = require('mongodb').ObjectId
class OrderController {
    create(req, res, next) {
        try {
            let itemTable = [
                {
                    productId: req.body.productId,
                    purchasedQty: req.body.purchasedQty,
                },
            ]

            let orderStatusTable = [
                {
                    isCompleted: req.body.isCompleted,
                    type: req.body.type,
                },
            ]

            const order = new Order({
                addressId: req.body.addressId,
                totalAmount: req.body.totalAmount,
                items: itemTable,
                paymentStatus: req.body.paymentStatus,
                paymentType: req.body.paymentType,
                user: req.body.user,
                orderStatus: orderStatusTable,
                createdTime: Date.now(),
            })

            order.save((error, order) => {
                if (error) return res.status(400).json({ error })
                if (order) {
                    return res.status(201).json({ order })
                }
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    addOrder = (req, res) => {
        try {
            Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    req.body.user = req.user._id
                    req.body.orderStatus = [
                        {
                            type: 'ordered',
                            date: new Date(),
                            isCompleted: true,
                        },
                        {
                            type: 'packed',
                            isCompleted: false,
                        },
                        {
                            type: 'shipped',
                            isCompleted: false,
                        },
                        {
                            type: 'delivered',
                            isCompleted: false,
                        },
                    ]
                    if (req.body?.paymentType == 'card') {
                        req.body?.paymentStatus === 'completed'
                    }
                    req.body.createdTime = Date.now()
                    const order = new Order(req.body)
                    order.user = req.user.id
                    order.save(async (error, order) => {
                        if (error) return res.status(400).json({ error })
                        if (order) {
                            const user = await User.findOne({
                                _id: req.user.id,
                            })
                            const updateListProduct = req.body.items?.map(
                                async (item) => {
                                    const product = await Product.findById(
                                        item.productId
                                    )
                                    const total =
                                        parseInt(product.quantitySold) +
                                        parseInt(item.purchasedQty)
                                    if (total > product?.quantity) {
                                        throw new Error('Error quantity')
                                    }
                                    await Product.updateOne(
                                        { _id: item.productId },
                                        { quantitySold: total }
                                    )
                                }
                            )
                            await Promise.all(updateListProduct)
                            sendEmailOrder(
                                user?.email,
                                `https://laptopshopv1.netlify.app/order_details/${order?._id}`,
                                'Đặt hàng thành công!',
                                user.lastName,
                                order?._id
                            )
                            res.status(201).json({ order })
                        }
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    getOrders = (req, res) => {
        try {
            Order.find({ user: req.user.id })
                .populate('user')
                .populate('items.productId')
                .sort({ createdTime: -1 })
                .exec((error, orders) => {
                    if (error) return res.status(400).json({ error })
                    if (orders) {
                        res.status(200).json({ orders })
                    }
                })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    getOrder = (req, res) => {
        try {
            let query = {}
            if (ObjectId.isValid(req.body.orderId)) {
                query = { _id: req.body.orderId }
            } else {
                query = { id: req.body.orderId }
            }
            Order.findOne(query)
                .populate('items.productId')
                .exec((error, order) => {
                    if (error) return res.status(400).json({ error })
                    if (order) {
                        res.status(200).json({
                            order,
                        })
                    }
                })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
    cancelOrder = (req, res) => {
        try {
            Order.findOneAndUpdate(
                { _id: req.body.data.payload.orderId },
                {
                    $set: {
                        paymentStatus: 'cancelled',
                        updatedTime: Date.now(),
                    },
                },
                { new: true, upsert: true }
            ).exec(async (error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    const updateListProduct = result?.items?.map(
                        async (item) => {
                            const product = await Product.findById(
                                item.productId
                            )
                            const total =
                                parseInt(product.quantitySold) -
                                parseInt(item.purchasedQty)
                            await Product.updateOne(
                                { _id: item.productId },
                                { quantitySold: total }
                            )
                        }
                    )
                    await Promise.all(updateListProduct)
                    res.status(202).json({ result })
                }
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    getDataFilterOrder = async (req, res, next) => {
        try {
            const options = {
                limit: 99,
                lean: true,
                populate: [
                    {
                        path: 'user',
                        select: '_id firstname lastname',
                    },
                ],
            }
            const searchModel = req.body
            const query = {}
            if (
                !!searchModel.TotalAmount &&
                Array.isArray(searchModel.TotalAmount) &&
                searchModel.TotalAmount.length > 0
            ) {
                query._id = { $in: searchModel.TotalAmount }
            }

            if (!!searchModel.UserId && searchModel.UserId.length > 0) {
                query.user = { $in: searchModel.UserId }
            }
            Order.paginate({ $and: [query] }, options).then(function (result) {
                return res.json({
                    result,
                })
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
    searchOrders = async (req, res, next) => {
        const { q, sortOrder, sortBy, userId } = req.body.data.payload
        const listQuery = []
        if (q !== '') {
            const searchName = q
            const rgx = (pattern) => new RegExp(`.*${pattern}.*`)
            const searchNameRgx = rgx(searchName)

            if (userId) {
                const searchQuery = {
                    $match: {
                        name: { $regex: searchNameRgx, $options: 'i' },
                        category: ObjectId(userId),
                    },
                }
                listQuery.push(searchQuery)
            } else {
                const searchQuery = {
                    $match: { name: { $regex: searchNameRgx, $options: 'i' } },
                }
                listQuery.push(searchQuery)
            }
        }
        if (sortBy) {
            const order = sortOrder === 'asc' ? 1 : -1
            listQuery.push({ $sort: { [sortBy]: order } })
        }
        try {
            const ordersFilter = await Order.aggregate(listQuery).exec()
            if (ordersFilter) {
                res.status(200).json({ productsSearch: ordersFilter })
            }
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    updateCompletedOrder = (req, res) => {
        Order.findOneAndUpdate(
            { _id: req.body.data.payload.orderId },
            { $set: { paymentStatus: 'completed', updatedTime: Date.now() } },
            { new: true, upsert: true }
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error })
            if (result) {
                res.status(202).json({ result })
            }
        })
    }
}
module.exports = new OrderController()
