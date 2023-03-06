'use strict'
//service
const {
    addInventory,
    addProduct,
    addToCart
} = require('../services/ecommerce.service')
var that = module.exports = {
    addToCart: async(req, res, next) => {
        try {
            const {productId, userId, quantity} = req.body
            return res.json({
                elements: await addToCart({productId, userId, quantity})
            })
        } catch (error) {
            next(error)             
        }
    },
    addInventory: async(req, res, next) => {
        try {
            const {inventory} = req.body
            return res.json({
                elements: await addInventory(inventory)
            })
        } catch (error) {
            next(error)             
        }
    },
    addProduct: async(req, res, next) => {
        try {
            const {product} = req.body
            return res.json({
                elements: await addProduct(product)
            })
        } catch (error) {
            next(error)             
        }
    }
}
// const {
//   addInventory,
//   addProduct,
//   addToCart,
// } = require('../services/ecommerce.service');

// var that = (module.exports = {
//   addToCart: async (req, res, next) => {
//     try {
//       const { productId, quantity, userId } = req.body;
//       return res.json({
//         elements: await addToCart({
//           productId,
//           quantity,
//           userId,
//         }),
//       });
//     } catch (error) {
//       console.error(error)
//       //next(error);
//     }
//   },
//   addInventory: async (req, res, next) => {
//     try {
//       const { inventory } = req.body;
//       return res.json({
//         elements: await addInventory(inventory),
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   addProduct: async (req, res, next) => {
//     try {
//       const { product } = req.body;
//       //console.log(product)
//       return res.json({
//         elements: await addProduct(product),
//       });
//     } catch (error) {
//       console.error(error);
//       //next(error);
//     }
//   },
// });
