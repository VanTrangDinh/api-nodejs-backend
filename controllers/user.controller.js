'use strict';
const {
  getMethods,
  getStatics,
  createUser,
  regisUser,
  verifyOtp,
} = require('../services/user.service');

const that = (module.exports = {
  verifyOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const { code, message, elements } = await verifyOtp({
        email,
        otp,
      });
      return res.status(code).json({
        code,
        message,
        elements
      })
    } catch (error) {
      console.error(error);
    }
  },
  regisUser: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { code, message, elements } = await regisUser({
        email,
      });
      return res.status(code).json({
        code,
        message,
        elements,
      });
    } catch (error) {
      console.error(error);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { email, username, userId } = req.body;
      res.json({
        elements: await createUser({
          email,
          userId,
          username,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  },
  getMethods: async (req, res, next) => {
    try {
      res.json({
        message: await getMethods(),
      });
    } catch (error) {
      console.error(error);
    }
  },
  getStatics: async (req, res, next) => {
    try {
      res.json({
        message: await getStatics(),
      });
    } catch (error) {
      console.error(error);
    }
  },
});

// 'use strict';
// //services
// const {
//   getMethods,
//   getStatics,
//   createUser,
//   regisUser,
//   verifyOtp,
// } = require('../services/user.service');
// const that = (module.exports = {
//   verifyOtp: async (req, res, next) => {
//     try {
//       const { email, otp } = req.body;
//       const { code, message, elements } = await verifyOtp({
//         email,
//         otp,
//       });
//       return res.status(code).json({
//         code,
//         elements,
//         message,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   regisUser: async (req, res, next) => {
//     try {
//       const { email } = req.body;
//       const { code, message, elements } = await regisUser({
//         email,
//       });
//       return res.status(code).json({
//         code,
//         message,
//         elements,
//       });
//     } catch (error) {
//       console.error(error);
//       next();
//     }
//   },

//   createUser: async (req, res, next) => {
//     try {
//       const { userId, username, email } = req.body;
//       res.json({
//         elements: await createUser({
//           email,
//           userId,
//           username,
//         }),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   getMethods: async (req, res, next) => {
//     try {
//       res.json({
//         message: await getMethods(),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   getStatics: async (req, res, next) => {
//     try {
//       res.json({
//         message: await getStatics(),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   },
// });
