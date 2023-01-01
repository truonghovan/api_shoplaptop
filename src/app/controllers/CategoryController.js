const slugify = require('slugify')
const env = require('dotenv')
const shortid = require('shortid')
const Category = require('../models/Category')

function createCategories(categories, parentId = null) {
    const categoryList = []
    let category
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId === undefined)
    } else {
        category = categories.filter((cat) => cat.parentId === parentId)
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cate of category) {
        categoryList.push({
            // eslint-disable-next-line no-underscore-dangle
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            image: cate.categoryImage,
            type: cate.type,
            // eslint-disable-next-line no-underscore-dangle
            children: createCategories(categories, cate._id),
        })
    }
    return categoryList
}

class CategoryController {
    create(req, res, next) {
        try {
            if (req.actions.includes('Them-nhan-hang')) {
                const categoryObject = {
                    name: req.body.name,
                    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
                    categoryImage: req.body.categoryImage,
                    createdTime: Date.now(),
                }
                if (req.file) {
                    categoryObject.categoryImage = `/uploads/${req.file.filename}`
                }
                if (req.body.parentId) {
                    categoryObject.parentId = req.body.parentId
                }
                const cat = new Category(categoryObject)
                // eslint-disable-next-line consistent-return
                cat.save((error, category) => {
                    if (error) return res.status(400).json({ error })
                    if (category) {
                        return res.status(201).json({ category })
                    }
                })
            } else {
                return res.status(403).send('Khongduquyen')
            }
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    getCategories(req, res, next) {
        // eslint-disable-next-line consistent-return
        try {
            Category.find({}).exec((error, categories) => {
                if (error) return res.status(400).json({ error })
                if (categories) {
                    const categoryList = createCategories(categories)
                    res.status(200).json({ categoryList })
                }
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    async updateCategories(req, res, next) {
        try {
            if (req.actions.includes('Chinh-sua-nhan-hang')) {
                Category.findOne({ _id: req.body._id }, function (err, obj) {
                    console.log(req.body)
                    const tempSlug = `${slugify(
                        req.body.nameCategory
                    )}-${shortid.generate()}`
                    Category.updateOne(
                        {
                            _id: req.body._id,
                        },
                        {
                            $set: {
                                name: req.body.nameCategory,
                                slug: tempSlug,
                                categoryImage: req.body.categoryImage,
                                updatedTime: Date.now(),
                            },
                        }
                    ).exec((error, category) => {
                        if (error) return res.status(400).json({ error })
                        if (category) {
                            res.status(201).json({ category })
                        }
                    })
                })
            } else {
                return res.status(403).send('Khongduquyen')
            }
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    deleteCategories = (req, res) => {
        try {
            if (req.actions.includes('Xoa-nhan-hang')) {
                Category.deleteOne({ _id: req.body.data.ids._id }).exec(
                    (error, result) => {
                        if (error) return res.status(400).json({ error })
                        if (result) {
                            res.status(202).json({ result })
                        }
                    }
                )
            } else {
                return res.status(403).send('Khongduquyen')
            }
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    getDataFilter = async (req, res, next) => {
        try {
            const options = {
                limit: 99,
                lean: true,
            }
            const searchModel = req.body
            const query = {}
            if (
                !!searchModel.CategoryName &&
                Array.isArray(searchModel.CategoryName) &&
                searchModel.CategoryName.length > 0
            ) {
                query.name = { $in: searchModel.CategoryName }
            }
            Category.paginate({ $and: [query] }, options).then(function (
                result
            ) {
                return res.json({
                    result: createCategories(result.docs),
                })
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
}

module.exports = new CategoryController()
