'use strict';
//model
const _User = require('../models/user.model');
const _Otp = require('../models/otp.model');
const OtpGenerator = require('otp-generator');
//services
const { insertOtp, validOtp } = require('./otp.service');
//helpers

//const { userValidate} = require('../helpers/validation')
//utils

var that = (module.exports = {
  verifyOtp: async ({ email, otp }) => {
    try {
      const otpHolder = await _Otp.find({ email });
      if (!otpHolder.length) {
        return {
          code: 404,
          message: 'Expired OTP',
        };
      }
      //get last otp
      const lastOtp = otpHolder[otpHolder.length - 1];
      //console.log(lastOtp);
      //console.log(otpHolder);
      const isvalid = await validOtp({
        otp,
        hashOtp: lastOtp.otp,
      });
      if (!isvalid) {
        return {
          code: 401,
          message: 'Invalid OTP',
        };
      }
      if (isvalid && email === lastOtp.email) {
        //create user in data
        const user = await _User.create({
          username: 'Ronaldo',
          email,
          userId: 1,
        });
        if (user) {
          //deleteMany otp in data
          await _Otp.deleteMany({ email });
        }
        return {
          code: 201,
          elements: user,
        };
      }
    } catch (error) {
      console.error(error);
    }
  },
  regisUser: async ({ email }) => {
    try {
      const user = await _User.findOne({ email });
      if (user) {
        return {
          code: 400,
          message: 'This email is already in user!',
        };
      }
      const OTP = OtpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      console.log(`OTP is:::`, OTP);
      //send via email or sms
      return {
        code: 200,
        elements: await insertOtp({
          email,
          otp: OTP,
        }),
      };
    } catch (error) {
      console.error(error);
    }
  },
  getStatics: async () => {
    return _User.getStatics();
  },
  getMethods: async () => {
    const __User = new _User();
    return __User.getMethods();
  },
  createUser: async ({ userId, username, email }) => {
    const user = new _User({
      userId,
      username,
      email,
    });
    return await user.save();
  },
});

// 'use strict';
// //model
// const _User = require('../models/user.model');
// const _Otp = require('../models/otp.model');
// const OtpGenerator = require('otp-generator');

// //services
// const { insertOtp, validOtp } = require('./otp.service.js');

// //utils
// var that = (module.exports = {
//   verifyOtp: async ({ email, otp }) => {
//     try {
//       const otpHolder = await _Otp.find({ email });
//       if (!otpHolder.length) {
//         return {
//           code: 404,
//           message: 'Expired OTP',
//         };
//       }
//       //get last otp
//       const lastOtp = otpHolder[otpHolder.length - 1];
//       const isvalid = await validOtp({
//         otp,
//         hashOtp: lastOtp.otp,
//       });
//       if (!isvalid) {
//         return {
//           code: 401,
//           message: 'Invalid OTP',
//         };
//       }
//       if (isvalid && email === lastOtp.email) {
//         //create user in data
//         const user = await _User.create({
//           username: 'Ronaldo',
//           email,
//           userId: 1,
//         });
//         if (user) {
//           //deleteMany otp in user
//           await _Otp.deleteMany({ email });
//         }
//         return {
//           code: 201,
//           elements: user,
//         };
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   regisUser: async ({ email }) => {
//     const user = await _User.findOne({ email });
//     if (user) {
//       return {
//         code: 400,
//         message: 'This email i already in user!',
//       };
//     }
//     const OTP = OtpGenerator.generate(6, {
//       digits: true,
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });
//     console.log(`OTP is:::`, OTP);
//     //send user via email or sms
//     return {
//       code: 200,
//       elements: await insertOtp({
//         email,
//         otp: OTP,
//       }),
//     };
//   },

//   getStatics: async () => {
//     return _User.getStatics();
//   },
//   getMethods: async () => {
//     const __User = new _User();
//     return __User.getMethods();
//   },
//   createUser: async ({ userId, username, email }) => {
//     const user = new _User({
//       userId,
//       username,
//       email,
//     });
//     return await user.save();
//   },
// });
