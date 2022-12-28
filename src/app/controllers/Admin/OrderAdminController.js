const Order = require('../../models/Order')
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })
function generateSortOptions(sortFields, sortAscending = true) {
    const sort = {}
    const sortType = sortAscending ? 1 : -1
    return new Promise((resolve) => {
        if (!!sortFields && sortFields.length > 0) {
            sortFields.forEach((field) => {
                switch (field) {
                    case 'Order_Code': {
                        sort.Order_Code = sortType
                        break
                    }
                    case 'TotalAmount': {
                        sort.TotalAmount = sortType
                        break
                    }
                    case 'UserId': {
                        sort.UserId = sortType
                        break
                    }
                    default:
                        break
                }
            })
            resolve(sort)
        } else {
            resolve({})
        }
    })
}

class OrderAdminController {
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
                totalAmount: req.body.totalAmount,
                items: itemTable,
                paymentStatus: req.body.paymentStatus,
                quanpaymentTypetity: req.body.paymentType,
                user: req.body.user,
                orderStatus: orderStatusTable,
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

    getOrders = async (req, res) => {
        try {
            const orders = await Order.find({})
                .populate({ path: 'user' })
                .exec()
            res.status(200).json({ orders })
        } catch (error) {
            console.log(error)
        }
    }

    getDataOrdersSales = async (req, res) => {
        try {
            const orders = await Order.find({
                orderStatus: {
                    $elemMatch: { type: 'delivered', isCompleted: true },
                },
            })
                .select('_id totalAmount items orderStatus')
                .populate('items.productId', '_id name salePrice view')
                .exec()
            res.status(200).json({ orders })
        } catch (error) {
            console.log(error)
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const allOrders = await Order.find({}).populate(
                { path: 'userObject' }
            )
            if (allOrders) {
                res.status(200).json({ allOrders })
            }
        } catch (err) {
            return res.status(500).json({ err })
        }
    }

    updateOrderStatus = (req, res) => {
        // const ordStatus = Order.findById(req.body._id);
        try {
            if (req.actions.includes('Cap-nhap-don-hang')) {
                Order.findOne({ _id: req.body._id }, function (err, obj) {
                    const index = obj?.orderStatus?.findIndex(
                        (item) => item.type === req.body.type
                    )
                    console.log(index)
                    if (index == 0) {
                        Order.updateOne(
                            {
                                _id: req.body._id,
                            },
                            {
                                $set: {
                                    orderStatus: [
                                        {
                                            type: 'ordered',
                                            date: req.body.date,
                                            isCompleted: true,
                                        },
                                        {
                                            type: 'packed',
                                            date: obj.orderStatus[1].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'shipped',
                                            date: obj.orderStatus[2].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'delivered',
                                            date: obj.orderStatus[3].date,
                                            isCompleted: false,
                                        },
                                    ],
                                },
                            }
                        ).exec((error, order) => {
                            if (error) return res.status(400).json({ error })
                            if (order) {
                                res.status(201).json({ order })
                            }
                        })
                    } else if (index == 1) {
                        Order.updateOne(
                            {
                                _id: req.body._id,
                            },
                            {
                                $set: {
                                    orderStatus: [
                                        {
                                            type: 'ordered',
                                            date: obj.orderStatus[0].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'packed',
                                            date: req.body.date,
                                            isCompleted: true,
                                        },
                                        {
                                            type: 'shipped',
                                            date: obj.orderStatus[2].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'delivered',
                                            date: obj.orderStatus[3].date,
                                            isCompleted: false,
                                        },
                                    ],
                                },
                            }
                        ).exec((error, order) => {
                            if (error) return res.status(400).json({ error })
                            if (order) {
                                res.status(201).json({ order })
                            }
                        })
                    } else if (index == 2) {
                        Order.updateOne(
                            {
                                _id: req.body._id,
                            },
                            {
                                $set: {
                                    orderStatus: [
                                        {
                                            type: 'ordered',
                                            date: obj.orderStatus[0].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'packed',
                                            date: obj.orderStatus[1].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'shipped',
                                            date: req.body.date,
                                            isCompleted: true,
                                        },
                                        {
                                            type: 'delivered',
                                            date: obj.orderStatus[3].date,
                                            isCompleted: false,
                                        },
                                    ],
                                },
                            }
                        ).exec((error, order) => {
                            if (error) return res.status(400).json({ error })
                            if (order) {
                                res.status(201).json({ order })
                            }
                        })
                    } else {
                        Order.updateOne(
                            {
                                _id: req.body._id,
                            },
                            {
                                $set: {
                                    orderStatus: [
                                        {
                                            type: 'ordered',
                                            date: obj.orderStatus[0].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'packed',
                                            date: obj.orderStatus[1].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'shipped',
                                            date: obj.orderStatus[2].date,
                                            isCompleted: false,
                                        },
                                        {
                                            type: 'delivered',
                                            date: req.body.date,
                                            isCompleted: true,
                                        },
                                    ],
                                },
                            }
                        ).exec((error, order) => {
                            if (error) return res.status(400).json({ error })
                            if (order) {
                                res.status(201).json({ order })
                            }
                        })
                    }
                })
            } else {
                return res.status(403).send('Khongduquyen')
            }
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    getCustomerOrders = async (req, res) => {
        try {
            const orders = await Order.find({})
                .populate('items.productId', 'name')
                .populate('user')
                .exec()
            res.status(200).json({ orders })
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
                        path: 'userObject',
                    },
                    { path: 'items.productId' },
                ],
            }
            const searchModel = req.body
            const query = {}
            if (
                !!searchModel.TotalAmount &&
                Array.isArray(searchModel.TotalAmount) &&
                searchModel.TotalAmount.length > 0
            ) {
                query.totalAmount = { $in: searchModel.TotalAmount }
            }

            if (
                !!searchModel.UserId &&
                Array.isArray(searchModel.UserId) &&
                searchModel.UserId.length > 0
            ) {
                query.user = { $in: searchModel.UserId }
            }

            if (
                !!searchModel.Order_Code &&
                Array.isArray(searchModel.Order_Code) &&
                searchModel.Order_Code.length > 0
            ) {
                query._id = { $in: searchModel.Order_Code }
            }

            if (
                !!searchModel.Address_Name &&
                Array.isArray(searchModel.Address_Name) &&
                searchModel.Address_Name.length > 0
            ) {
                query.addressId = { $in: searchModel.Address_Name }
            }

            if (
                !!searchModel.Payment_Status &&
                Array.isArray(searchModel.Payment_Status) &&
                searchModel.Payment_Status.length > 0
            ) {
                query.paymentStatus = { $in: searchModel.Payment_Status }
            }

            if (
                !!searchModel.Payment_Type &&
                Array.isArray(searchModel.Payment_Type) &&
                searchModel.Payment_Type.length > 0
            ) {
                query.paymentType = { $in: searchModel.Payment_Type }
            }

            // const tempOrderStatus = query.orderStatus?.find(data => data.isCompleted === true);
            if (
                !!searchModel.Order_Status &&
                Array.isArray(searchModel.Order_Status) &&
                searchModel.Order_Status.length > 0
            ) {
                query.orderStatus = {
                    $elemMatch: {
                        type: searchModel.Order_Status,
                        isCompleted: true,
                    },
                }
            }

            // if (!!searchModel.UserId && searchModel.UserId.length > 0) {
            //     query.user._id = { $in: searchModel.UserId }
            // }

            // if (!!searchModel.Status && searchModel.Status.length > 0) {
            //     query.Status = { $in: searchModel.Status }
            // }
            Order.paginate({ $and: [query] }, options).then(function (result) {
                return res.json({
                    result,
                })
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    search = async function (req, res) {
        const query = {}
        const { page } = req.body.searchOptions
        const limit = parseInt(req.body.searchOptions.limit, 99)
        const sortFields = req.body.searchOptions.sort
        const sortAscending = req.body.searchOptions.sortAscending
        //Tạo điều kiện sắp xếp
        const sort = await generateSortOptions(sortFields, sortAscending)
        const options = {
            //select:   'Status',
            sort,
            page,
            limit,
            lean: true,
        }

        const searchModel = req.body.searchModel

        //Tạo query get data theo permissio
        if (
            typeof searchModel.Order_Code === 'string' &&
            !!searchModel.Order_Code
        ) {
            query.Order_Code = {
                $regex: new RegExp(searchModel.Order_Code, 'i'),
            }
        } else if (
            typeof searchModel.Order_Code === 'object' &&
            !!searchModel.Order_Code &&
            searchModel.Order_Code.length > 0
        ) {
            query.Order_Code = { $in: searchModel.Order_Code }
        } else if (
            !!searchModel.Order_Code &&
            Array.isArray(searchModel.Order_Code) &&
            searchModel.Order_Code.length > 0
        ) {
            query.Order_Code = { $in: searchModel.Order_Code }
        }
        if (!!searchModel.UserId && searchModel.UserId.length > 0) {
            query.UserId = { $in: searchModel.UserId }
        }
        if (!!searchModel.TotalAmount && searchModel.TotalAmount.length > 0) {
            query.TotalAmount = { $in: searchModel.TotalAmount }
        }

        Product.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                returnCode: 1,
                result,
            })
        })
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
                        user: ObjectId(userId),
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
                res.status(200).json({ ordersSearch: ordersFilter })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    deleteOrderById = (req, res) => {
        try {
            const { orderId } = req.body.payload
            if (orderId) {
                Order.deleteOne({ _id: orderId }).exec((error, result) => {
                    if (error) return res.status(400).json({ error })
                    if (result) {
                        res.status(202).json({ result })
                    }
                })
            } else {
                res.status(400).json({ error: 'Params required' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = new OrderAdminController()
