// const express = require('express');
// const redis = require('redis');
// const client = require('../helpers/init.redis')
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

// module.exports = rateLimit
