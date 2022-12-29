const express = require('express')
const ProductController = require('../app/controllers/ProductController')

const router = express.Router()
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const Product = require('../app/models/Product')
const { requireSignin } = require('../middleware')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename(req, file, cb) {
        cb(null, `${shortid.generate()}-${file.originalname}`)
    },
})

const upload = multer({ storage })

router.post(
    '/create',
    requireSignin,
    // adminMiddleware,
    // upload.array('productPicture'),
    ProductController.create
)
router.post(
    '/update',
    requireSignin,
    // adminMiddleware,
    upload.array('productPicture'),
    ProductController.updateProduct
)
router.get('/products/:slug', ProductController.getProductBySlug)
router.post('/searchProduct', ProductController.searchProducts)
router.post('/getDataFilter', ProductController.getDataFilter)
router.post('/uploadPicture', ProductController.uploadPicture)
router.post('/uploadavatar', requireSignin, ProductController.uploadAvatar)
router.post('/getProducts', ProductController.getProducts)
router.post('/getProductRelated', ProductController.getProductRelated)
// router.get('/productWarning', ProductController.productWarning)
router.get('/getAllProducts', ProductController.getAllProducts)
router.delete(
    '/deleteProductById',
    requireSignin,
    // adminMiddleware,
    ProductController.deleteProductById
)
router.get('/:productId', ProductController.getProductDetailsById)
router.post('/testSearch', ProductController.search)
module.exports = router
