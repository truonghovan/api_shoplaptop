const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var moment = require('moment')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')
const env = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const route = require('./routes')
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 60 })
var cron = require('node-cron')
const Product = require('./app/models/Product')
const totalView = require('./app/models/totalView')
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: [
            'https://laptopshopv1.netlify.app',
            'https://adminshoplaptop.netlify.app',
        ],
    },
})
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on('addOrder', (data) => {
        io.emit('notificationAddOrder', {
            data: 'Vừa có đơn hàng mới vui lòng kiểm tra.',
        })
    })
    socket.on('disconnect', () => {
        console.log('disconnect socket')
        io.disconnectSockets()
    })
})
// connect to db

app.use(cookieParser())

db.connect()
env.config()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'uploads')))
// HTTP Logger
app.use(morgan('combined'))
app.use(methodOverride('_method'))
app.use(
    cors({
        origin: [
            'https://laptopshopv1.netlify.app',
            'https://adminshoplaptop.netlify.app',
            'http://localhost:3000',
            'http://localhost:3002',
        ],
    })
)

// template engine

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))
const PORT = process.env.PORT || 3001
// Routes Init
cron.schedule(
    '* * * * *',
    async () => {
        const allProducts = await Product.find({}).populate({
            path: 'category',
            select: '_id name',
        })
        // eslint-disable-next-line prefer-const
        let productWarning = []
        // eslint-disable-next-line array-callback-return
        allProducts.map((item) => {
            if (item.quantity - item.quantitySold <= 10) {
                productWarning.push(item)
            }
        })
        myCache.set('productWarning', productWarning)
    },
    {
        scheduled: true,
    }
)
//View
cron.schedule(
    '0 0 * * *',
    async () => {
        try {
            console.log('Running a job at 00:00 at Asia/Bangkok timezone')
            const listPro = await Product.find({})
            var numberView = 0
            for (const e of listPro) {
                numberView += e.view
            }
            const total = new totalView({
                view: numberView,
            })
            // eslint-disable-next-line consistent-return
            total.save()
        } catch (error) {
            console.log(err)
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Bangkok',
    }
)
app.get('/productWarning', async (req, res) => {
    try {
        if (myCache.has('productWarning')) {
            res.status(200).json({
                productWarning: myCache.get('productWarning'),
            })
        } else {
            const allProducts = await Product.find({}).populate({
                path: 'category',
                select: '_id name',
            })
            // eslint-disable-next-line prefer-const
            let productWarning = []
            // eslint-disable-next-line array-callback-return
            allProducts.map((item) => {
                if (item.quantity - item.quantitySold <= 10) {
                    item['time'] = moment().format()
                    console.log(item)
                    productWarning.push(item)
                }
            })
            res.status(200).json({
                productWarning,
            })
            myCache.set('productWarning', productWarning)
        }
    } catch (err) {
        console.log(err)
    }
})

route(app)

// app.listen(PORT, () => {
//     console.log(`App listening at http://localhost:${PORT}`)
// })

server.listen(3001, () => {
    console.log('SERVER IS RUNNING')
})
