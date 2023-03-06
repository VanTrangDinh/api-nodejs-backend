// replay attrack

'use strict';
const TIME_REQUIMENT = 30;
const manu = [
  { name: 'cr7', number: 7 },
  { name: 'm10', number: 10 },
];
const mancity = [
    { name: 'cr8', number: 8 },
    { name: 'm10', number: 10 },
  ];

  //utils

const {
    genSign
} =require('../utils/index')

var that = (module.exports = {
  listPlayerByBlub: async (req, res, next) => {
    try {
      const { stime, sign, nonce, club } = req.query;
      if (!stime || !sign || !nonce) {
        return res.status(400).json({
          status: 'error',
          message: 'bad request',
        });
      }

      //compare time
      //lấy time của server - time của request
      const isTime = Math.floor(
        (Date.now() - stime) / 1000
      );
      console.log(`istime:::`, isTime)
      if (isTime > 30) {
        return res.status(401).json({
          status: 'error',
          message: 'expired!',
        });
      }

      //compare sign, truyne genSign tu util vao
      const signServer = await genSign(req.query);
      console.log(`sign:::${sign}:::signServer:::${signServer}`)
      if (signServer != sign) {
        return res.status(401).json({
          status: 'error',
          message: 'sign invalid!',
        });
      }

      // ok thi return data

      return res.status(200).json({
        status: 'success',
        elements: club === 'manu' ? manu : mancity
      })
    } catch (error) {
      next(error);
    }
  },
});
