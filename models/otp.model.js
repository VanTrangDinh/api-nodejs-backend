const { Schema, model } = require('mongoose');

const OtpSchema = new Schema(
  {
    otp: String,
    email: String,
    time: {
      type: Date,
      default: Date.now,
      index: { expires: 20 },
    },
  },
  {
    collection: 'otp',
    timestamps: true,
  }
);

module.exports = model('otp', OtpSchema);

// const { Schema, model } = require("mongoose");

// const OtpSchema = new Schema({
//     email: String,
//     otp: String,
//     time: { type: Date, default: Date.now, index: {expires: 20} }
// }, {
//     collection: 'otp'
// })

// module.exports = model('otp', OtpSchema)
