const { Error, MongooseError } = require('mongoose')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        //you update code here

        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
            .then((result) => resolve())
            .catch((err) => reject(err))
    })
}

class CartController {
    addItemToCart = (req, res) => {
        try {
            Cart.findOne({ user: req.user.id }).exec(async (error, cart) => {
                if (error) return res.status(400).json({ error })
                if (cart) {
                    //if cart already exists then update cart by quantity
                    let promiseArray = []
                    let error = 0
                    await req.body.cartItems.forEach(async (cartItem) => {
                        const product = cartItem.product
                        const checkProduct = await Product.findById(product)
                        if (
                            parseInt(checkProduct.quantity) -
                                parseInt(checkProduct.quantitySold) <
                            parseInt(cartItem.quantity)
                        ) {
                            error = 1
                            return
                        }
                        const item = cart.cartItems.find(
                            (c) => c.product == product
                        )
                        let condition, update
                        if (item) {
                            condition = {
                                user: req.user.id,
                                'cartItems.product': product,
                            }
                            update = {
                                $set: {
                                    'cartItems.$': cartItem,
                                },
                            }
                        } else {
                            condition = { user: req.user.id }
                            update = {
                                $push: {
                                    cartItems: cartItem,
                                },
                            }
                        }
                        promiseArray.push(runUpdate(condition, update))
                    })
                    if (error === 0) {
                        await Promise.all(promiseArray)
                            .then((response) =>
                                res.status(201).json({ response })
                            )
                            .catch((error) => res.status(400).json({ error }))
                    } else {
                        return res.status(400).json({ error: 'error' })
                    }
                } else {
                    //if cart not exist then create a new cart
                    const cart = new Cart({
                        user: req.user.id,
                        cartItems: req.body.cartItems,
                    })
                    cart.save((error, cart) => {
                        if (error) return res.status(400).json({ error })
                        if (cart) {
                            return res.status(201).json({ cart })
                        }
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
    getCartItems = (req, res) => {
        try {
            Cart.findOne({ user: req.user.id })
                .populate('cartItems.product')
                .exec((error, cart) => {
                    if (error) return res.status(400).json({ error })
                    if (cart === null) res.status(200).json({ cartItems: [] })
                    if (cart) {
                        let cartItems = {}
                        cart.cartItems.forEach((item, index) => {
                            cartItems[item.product._id.toString()] = {
                                _id: item.product._id.toString(),
                                name: item.product.name,
                                img: item.product.productPicture[0].img,
                                salePrice: item.product.salePrice,
                                regularPrice: item.product.regularPrice,
                                qty: item.quantity,
                            }
                        })

                        res.status(200).json({ cartItems })
                    }
                })
        } catch (error) {
            res.status(400).json({ error })
        }

        //}
    }
    removeCartItems = (req, res) => {
        try {
            const { productId } = req.body.payload
            if (productId) {
                Cart.findOneAndUpdate(
                    { user: req.user.id },
                    {
                        $pull: {
                            cartItems: {
                                product: productId,
                            },
                        },
                    }
                ).exec((error, result) => {
                    if (error) return res.status(400).json({ error })
                    if (result) {
                        res.status(202).json({ result })
                    }
                })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    }
    deleteAllProductCart = (req, res) => {
        try {
            Cart.deleteMany({ user: req.user.id }).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    res.status(202).json({ result })
                }
            })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = new CartController()
