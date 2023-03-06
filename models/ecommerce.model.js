const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    productId: { type: Number, required: true },
    code: String,
    name: String,
    brand: String,
    description: String,
    release_date: Date,
    specs: { type: Array, default: [] },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

const cartSchema = new Schema(
  {
    userId: Number,
    status: { type: String, default: 'active' },
    modifiedOn: { type: Date, default: Date.now },
    products: Array,
  },
  {
    collection: 'carts',
    timestamps: true,
  }
);

const orderSchema = new Schema(
  {
    orderId: Number,
    userId: Number,
    shipping: Object,
    payment: Object,
    products: Array,
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

const inventoriesShema = new Schema({
  productId: Number,
  quantity: Number, //10000 => 10000 -10 -10
  reservations: Array,
  create_at: { type: Date, default: Date.now },
});

module.exports = {
  _product: model('products', productSchema),
  _cart: model('carts', cartSchema),
  _order: model('orders', orderSchema),
  _inventory: model('inventories', inventoriesShema),
};

// const { Schema, model } = require('mongoose');

// //product model
// const productSchema = new Schema(
//   {
//     productId: { type: Number, required: true },
//     code: String,
//     name: String,
//     brand: String,
//     description: String,
//     release_date: Date,
//     specs: { type: Array, default: [] },
//   },
//   {
//     collection: 'products',
//     timestamps: true,
//   }
// );

// //cart models

// const cartSchema = new Schema(
//   {
//     userId: Number,
//     status: { type: String, default: 'active' },
//     modifiedOn: { type: Date, default: Date.now }, //thoi gian update dơn hàng
//     products: Array,
//   },
//   {
//     collection: 'carts',
//     timestamps: true,
//   }
// );

// //order model
// const orderSchema = new Schema(
//   {
//     orderId: Number,
//     userId: Number,
//     shipping: Object,
//     payment: Object,
//     products: Array,
//   },
//   {
//     collection: 'orders',
//     timestamps: true,
//   }
// );

// //inventories model

// const inventoriesShema = new Schema(
//   {
//     productId: Number,
//     quantity: Number, //10000 => 10000 -10 -10
//     reservations: Array,
//     /*
//     [
//         {
//             useId: 1,
//             quality: 10
//         },
//         // nếu userId : 2 hết hạn thời gian chờ thành toán thành đung redis hay rabittMQ  trong microservice để hoàn lại kho
//         {
//             userId: 2,
//             quality: 10
//         }
//     ]
//     */
//     create_at: { type: Date, default: Date.now },
//   },
//   {
//     collection: 'inventories',
//     timestamps: true,
//   }
// );

// module.exports = {
//   _product: model('products', productSchema),
//   _cart: model('carts', cartSchema),
//   _order: model('orders', orderSchema),
//   _inventory: model('inventories', inventoriesShema),
// };
