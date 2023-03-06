const express = require('express');
const { default: helmet } = require('helmet');
const app = express();
require('dotenv').config();
require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const { v4: uuid } = require('uuid');
const cors = require('cors');
const mongoose = require('./helpers/init.mongoodb');
const logEvents = require('./helpers/logEvent');
  
const bodyParser = require('body-parser');
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

//route: Services tự động hủy đơn hàng nếu chưa thanh toán N phút như Traveloka
const {
  addDelayEventOrder,
} = require('./services/order.service');

app.post('/order', async (req, res, next) => {
  try {
    const { userId, order } = req.body;
    await addDelayEventOrder({orderId: order.id, delay: 5});
  } catch (error) {
    next(error);
  }
});
// using middleware

// const rateLimit = require('./middleware/rate.limit')
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// // using redis
// app.use(rateLimit)

//cách hạn chế user request liên tục ( dùng request rate timming)
// xác định user request băng ip
// tạo dir helpers

// const {incr} = require('./models/limiter')

// app.get('/api', async (req, res, next) => {
//   try {
//     //get IP, ở express có hai cách lấy IP
//     const getIpUser = '128.0.0.1' /* || req.headers['x-forwarded-for'] || req.connection.remoteAddress */
//     console.log(req.headers['x-forwarded-for'], req.connection.remoteAddress)
//     const numRequest = await incr(getIpUser)

//    return res.json({
//       status: 'success',
//       numRequest,
//       elements: [
//         { id: 1, name: 'java'},
//          {id: 2, name: 'Nodejs'}
//         ]
//     })

//   } catch (error) {
//     throw new Error(error)
//   }
// })

//redis

// const client = require('./helpers/init.redis')

// const MAX_REQUESTS = 10; // Số lần yêu cầu tối đa trong khoảng thời gian nhất định
// const REQUEST_TIMEOUT = 60; // Khoảng thời gian 60 giây

// // Middleware để hạn chế số lần yêu cầu từng người dùng
// const rateLimit = (req, res, next) => {
//   const ip = req.ip; // Lấy địa chỉ IP của người dùng
//   const now = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại, chia 1000 để lấy thời gian Unix (giây)

//   // Tăng giá trị của key tương ứng trong Redis
//   client.incr(ip, (err, count) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     // Nếu key không tồn tại, set key và đặt thời gian hết hạn
//     if (count === 1) {
//       client.expire(ip, REQUEST_TIMEOUT, (err) => {
//         if (err) {
//           console.error(err);
//         }
//       });
//     }

//     // Kiểm tra số lượng yêu cầu
//     if (count <= MAX_REQUESTS) {
//       next();
//     } else {
//       res.status(429).send('Too many requests, please try again later.');
//     }
//   });
// };

// // Áp dụng middleware vào tất cả các yêu cầu
// app.use(rateLimit);

// // Đoạn mã này sẽ được xử lý nếu người dùng đã vượt quá số lần yêu cầu tối đa
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Khởi động ứ

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

//use cors to create a
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

// const users = [
//     {
//         name:'cr7'
//     },
//     {
//         name:'Cavani'
//     }
// ]

//use route

app.use(require('./routes'));

module.exports = app;
