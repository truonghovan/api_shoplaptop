// const Users = require('../models/User');
// const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const User = require('../../models/User')
const Role = require('../../models/Role')
const Screen = require('../../models/Screen')
const RoleAction = require('../../models/RoleAction')
function generateSortOptions(sortFields, sortAscending = true) {
    const sort = {}
    const sortType = sortAscending ? 1 : -1
    return new Promise((resolve) => {
        if (!!sortFields && sortFields.length > 0) {
            sortFields.forEach((field) => {
                switch (field) {
                    case 'RoleName': {
                        sort.RoleName = sortType
                        break
                    }
                    case 'StatusName': {
                        sort.StatusName = sortType
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

class AuthController {
    async createUser(req, res, next) {
        try {
            if (req.actions.includes('Them-tai-khoan')) {
                const {
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    roleId,
                    contactNumber,
                    profilePicture,
                    status,
                } = req.body
                const password = await bcrypt.hash(hash_password, 10)
                const user = new User({
                    firstName,
                    lastName,
                    userName: email,
                    email,
                    hash_password: password,
                    role: roleId,
                    contactNumber,
                    profilePicture,
                    status,
                    createdBy: req.user.id,
                })
                // eslint-disable-next-line consistent-return
                user.save((error, user) => {
                    if (error) return res.status(400).json({ error })
                    if (user) {
                        res.status(201).json({ user })
                    }
                })
            } else {
                return res.status(403).send('Khongduquyen')
            }
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    async updateUser(req, res, next) {
        try {
            const password = await bcrypt.hash(req.body.hash_password, 10)
            User.findOneAndUpdate(
                { _id: req.body._id },
                {
                    $set: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        hash_password: password,
                        role: req.body.roleId,
                        contactNumber: req.body.contactNumber,
                        profilePicture: req.body.profilePicture,
                        status: req.body.status,
                    },
                },
                { new: true, upsert: true }
            ).exec((error, user) => {
                console.log(error)
                if (error) return res.status(400).json({ error })
                if (user) {
                    res.status(201).json({ user })
                }
            })
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    // [POST] /buyer/signup
    signup(req, res, next) {
        try {
            User.findOne({ email: req.body.email }).exec(
                async (error, user) => {
                    if (user)
                        return res.status(400).json({
                            message: 'Admin already registered',
                        })
                    const { role, firstName, lastName, email, password } =
                        req.body
                    // eslint-disable-next-line camelcase
                    const hash_password = await bcrypt.hash(password, 10)
                    // eslint-disable-next-line no-underscore-dangle
                    const _user = new User({
                        role,
                        firstName,
                        lastName,
                        email,
                        // eslint-disable-next-line camelcase
                        hash_password,
                        userName: shortid.generate(),
                        role: 'admin',
                    })
                    // eslint-disable-next-line no-shadow
                    _user.save((error, data) => {
                        if (error) {
                            return res
                                .status(400)
                                .json({ message: 'Something went wrong' })
                        }

                        if (data) {
                            return res.status(201).json({
                                message: 'Admin created Successfully...!',
                            })
                        }
                    })
                }
            )
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    //[POST] /admin/signin
    signin(req, res) {
        try {
            User.findOne({ email: req.body.email }).exec(
                async (error, user) => {
                    if (error) return res.status(400).json({ error })
                    if (user) {
                        const isPassword = user.authenticate(req.body.password)
                        let testRole = await Role.find({ _id: user.role })

                        let listAction = await RoleAction.findOne({
                            roleId: user.role,
                        })
                        var listActionId = []
                        listAction?.listAction.map((item) => {
                            listActionId.push(item)
                        })
                        let tempScreen = await Screen.find({
                            action: { $elemMatch: { $in: listActionId } },
                        })
                        const rolescreen = []
                        tempScreen.map((e) =>
                            rolescreen.push({ screenSlug: e.screenSlug })
                        )
                        if (
                            isPassword &&
                            testRole[0].nameRole !== 'Khách hàng'
                        ) {
                            const refresh_token = createRefreshToken({
                                id: user._id,
                                role: user.role,
                            })
                            res.status(200).json({
                                message: 'Login success!',
                                token: refresh_token,
                                datamap: rolescreen,
                                listAction,
                            })
                        } else {
                            return res.status(400).json({
                                message: 'Invalid Password',
                            })
                        }
                    } else {
                        return res
                            .status(400)
                            .json({ message: 'Something went wrong' })
                    }
                }
            )
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    signout(req, res, next) {
        res.clearCookie('token')
        res.status(200).json({
            message: 'Signout successfully...!',
        })
    }

    // eslint-disable-next-line consistent-return
    getAccessToken(req, res) {
        try {
            // eslint-disable-next-line camelcase
            const rf_token = req.body.refreshtoken

            // eslint-disable-next-line camelcase
            if (!rf_token)
                return res.status(400).json({ msg: 'Please login now!' })
            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                // eslint-disable-next-line consistent-return
                (err, user) => {
                    if (err)
                        return res
                            .status(400)
                            .json({ msg: 'Please login now!' })

                    // eslint-disable-next-line no-use-before-define, camelcase
                    const access_token = createAccessToken({
                        id: user.id,
                        role: user.role,
                    })

                    // eslint-disable-next-line camelcase
                    res.json({ access_token })
                }
            )
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    // eslint-disable-next-line consistent-return
    async getUserInfor(req, res) {
        try {
            const user = await User.findById(req.user.id).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    getUsers = async (req, res) => {
        try {
            const users = await User.find({}).populate({ path: 'role' }).exec()
            res.status(200).json({ users })
        } catch (error) {
            console.log(error)
        }
    }

    async getUserUsing(req, res) {
        try {
            const users = await User.find({ _id: req.user.id })
                .populate({ path: 'role' })
                .exec()
            res.status(200).json({ users })
        } catch (err) {
            console.log(err)
        }
    }

    deleteAccountById = (req, res) => {
        try {
            if (req.actions.includes('Xoa-tai-khoan')) {
                const { userId } = req.body.payload
                if (userId) {
                    User.deleteMany({ _id: userId }).exec((error, result) => {
                        if (error) return res.status(400).json({ error })
                        if (result) {
                            res.status(202).json({ result })
                        }
                    })
                } else {
                    res.status(400).json({ error: 'Params required' })
                }
            } else {
                return res.status(403).send('Khongduquyen')
            }
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    getDataFilterUser = async (req, res, next) => {
        try {
            const options = {
                limit: 99,
                lean: true,
                populate: [{ path: 'role' }],
            }
            const searchModel = req.body
            const query = {}
            if (
                !!searchModel.RoleName &&
                Array.isArray(searchModel.RoleName) &&
                searchModel.RoleName.length > 0
            ) {
                query.role = { $in: searchModel.RoleName }
            }

            if (
                !!searchModel.StatusName &&
                Array.isArray(searchModel.StatusName) &&
                searchModel.StatusName.length > 0
            ) {
                query.status = { $in: searchModel.StatusName }
            }

            if (
                !!searchModel.Account_Name &&
                Array.isArray(searchModel.Account_Name) &&
                searchModel.Account_Name.length > 0
            ) {
                query._id = { $in: searchModel.Account_Name }
            }

            if (
                !!searchModel.Email &&
                Array.isArray(searchModel.Email) &&
                searchModel.Email.length > 0
            ) {
                query.email = { $in: searchModel.Email }
            }

            User.paginate({ $and: [query] }, options).then(function (result) {
                return res.json({
                    result,
                })
            })
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    search = async function (req, res) {
        try {
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

            if (!!searchModel.StatusName && searchModel.StatusName.length > 0) {
                query.StatusName = { $in: searchModel.StatusName }
            }

            if (!!searchModel.RoleName && searchModel.RoleName.length > 0) {
                query.RoleName = { $in: searchModel.RoleName }
            }

            User.paginate({ $and: [query] }, options).then(function (result) {
                return res.json({
                    returnCode: 1,
                    result,
                })
            })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    setStatusUser(req, res) {
        // eslint-disable-next-line consistent-return
        User.findOne({ _id: req.body.id }).exec(async (error, user) => {
            try {
                const { id } = req.body
                if (user.status === 'disable') {
                    const updateStatus = User.findOneAndUpdate(
                        { _id: id },
                        { $set: { status: 'enable' } },
                        { new: true }
                        // eslint-disable-next-line no-shadow, consistent-return
                    ).exec((error, result) => {
                        if (error) return res.status(400).json({ error })
                        if (result) {
                            return res.status(201).json({ updateStatus })
                        }
                    })
                } else {
                    const updateStatus = User.findOneAndUpdate(
                        { _id: id },
                        { $set: { status: 'disable' } },
                        { new: true }
                        // eslint-disable-next-line no-shadow, consistent-return
                    ).exec((error, result) => {
                        if (error) return res.status(400).json({ error })
                        if (result) {
                            return res.status(201).json({ updateStatus })
                        }
                    })
                }
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        })
    }
}
const createAccessToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    })

const createRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '15d',
    })
module.exports = new AuthController()
