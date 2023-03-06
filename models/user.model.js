const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
    username: {
        String,
        lowercase: true,
        unique: true, 
        required: true
    } ,
    password: {
        type: String,
        required: true
    }

}, {
    collection: 'users',
    timestamps: true
})





//satics, methods, virtual, middle
UserSchema.virtual('getTime').get(() =>{
    return Date.now()
})

UserSchema.statics.getStatics = () => {
    return 'get statics'
}
UserSchema.methods.getMethods = function() {
    return `get methods ${this.getTime}`
}

//Middleware
UserSchema.pre('save',function(next) {
    this.username = "M20"
    next()
})

module.exports = model('users', UserSchema)


































// const { Schema, model } = require("mongoose");

// const UserSchema = new Schema({
//   userId: {type: Number, required: true},
//   email: String,
//   username: String
// }, {
//   collection: 'users',
//   timestamps: true
// })

// //statics, methods, virtual, middleware
// UserSchema.virtual('getTime').get(() => {
//   return Date.now()
// })

// UserSchema.statics.getStatics = () => {
//   return 'get statics'
// }
// UserSchema.methods.getMethods = function() {
//   return `get methods ${this.getTime}`
// }

// module.exports = model('users', UserSchema)





















// // const { Schema, model } = require('mongoose');

// // const UserSchema = new Schema(
// //   {
// //     userId: { type: Number, required: true },
// //     username: String,
// //     email: String,
// //   },
// //   {
// //     collection: 'users',
// //     timestamps: true,
// //   }
// // );

// // //statics, methods, virtual, middleware
// // UserSchema.virtual('getTime').get(() => {
// //   return Date.now();
// // });
// // UserSchema.statics.getStatics = () => {
// //   return 'get statics';
// // };

// // UserSchema.methods.getMethods = function () {
// //   return `get methods ${this.getTime}`;
// // };
// // //middleware

// // module.exports = model('users', UserSchema);
