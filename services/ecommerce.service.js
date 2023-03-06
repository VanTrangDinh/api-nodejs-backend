'use strict'
//model
const {
    _cart,
    _inventory,
    _order,
    _product
} = require('../models/ecommerce.model')
var that = module.exports = {
    //add product
    addProduct: async(product) => {
        console.log(`product:::`, product)
        return await _product.create(product)
    },
    //add inventory
    addInventory: async(inventory) => {
        console.log(`product:::`, inventory)
        return await _inventory.create(inventory)
    },
    //add to cart
    addToCart: async({
        productId, userId, quantity
    }) => {
        // check kho con hang k

        /*
     - step 1: kiểm tra còn hàng trong kho không
     - step 2: addtocart
      - nếu trong kho không còn hàng thì xóa
    */
        const stock = await _inventory.updateOne({
            productId,
            quantity: {$gt: quantity} // check so luong hang trong kho lon hon hang dat
        }, {
            $inc: {
                quantity: -quantity
            },
            $push: {
                reservations: {
                    userId,
                    quantity
                }
            }
        })
        
        console.log(`add stock:::`, stock)
        if(stock.modifiedCount) {
            //add to cart
            const addToCart = await _cart.findOneAndUpdate({
                userId,
            }, {
                $push: {
                    products: {
                        productId,
                        quantity
                    }
                }
            }, {
                upsert: true,
                new: true
            })

            console.log(`add to cart:::`, addToCart)

            return 1
        }
    }
}

// 'use strict';

// //model
// const {
//   _product,
//   _order,
//   _inventory,
//   _cart,
// } = require('../models/ecommerce.model');
// var that = (module.exports = {
//   //add product
//   addProduct: async (product) => {
//     console.log(`productId:::`, product);
//     return await _product.create(product);
//   },
//   addInventory: async (inventory) => {
//     return await _inventory.create(inventory);
//   },

//   addToCart: async ({ productId, quantity, userId }) => {
//     const stock = await _inventory.updateOne(
//       {
//         productId,
//         quantity: { $gt: quantity },
//       },
//       {
//         $inc: {
//           quantity: -quantity,
//         },
//         $push: {
//           reservations: {
//             userId,
//             quantity,
//           },
//         },
//       }
//     );

//     console.log(`add stock:::`, stock);

//     if (stock.modifiedCount) {
//       //add to cart

//       const addToCart = await _cart.findOneAndUpdate(
//         {
//           userId,
//         },
//         {
//           $push: {
//             products: {
//               productId,
//               quantity,
//             },
//           },
//         }, {
//           upsert: true,
//           new: true
//         }
//       );

//       console.log(`add cart:::`, addToCart);

//       return 1;
//     }
//   },
//   // addToCart: async ({
//   //   // không cần thêm giá vào giỏ hàng vì nó biến động, ta sẽ tham chiếu đến giá nhờ productId
//   //   productId,
//   //   quantity, // 2
//   //   userId,
//   // }) => {
//   //   /*
//   //    - step 1: kiểm tra còn hàng trong kho không
//   //    - step 2: addtocart
//   //     - nếu trong kho không còn hàng thì xóa
//   //   */
//   //   //đọc lại phần atome

//   //   const stock = await _inventory.updateOne(
//   //     {
//   //       productId,
//   //       quantity: {$gt: quantity} // kiểm tra lượng đặt hàng vs lượng hàng trong kho
//   //     },
//   //     {
//   //       //set lại số lượng hàng trong kho
//   //       $inc: {
//   //         quantity: -quantity,
//   //       },
//   //       //push vào chỗ đặt hàng
//   //       $push: {
//   //         reservations: {
//   //           userId,
//   //           quantity,
//   //           productId, //có thể không cần, vì nó đã tham chiếu ở trên rùi
//   //         },
//   //       },
//   //     }
//   //   );
//   //   console.log(`add stock`, stock);
//   //   //nếu update thành công, nghĩa là giá trị đưa vào ok
//   //   // kiểm tra stock > 1 => update thành cồng
//   //   if (stock.modifiedCount) {
//   //     //add to cart
//   //     // sử dụng tính nguyên tử, nếu không có thì tạo dữ liệu mới, có rồi thì update, findOneandUpdate()
//   //     const addToCart = await _cart.findOneAndUpdate(
//   //       {
//   //         userId,
//   //       },
//   //       {
//   //         $push: {
//   //           products: {
//   //             productId,
//   //             quantity,
//   //           },
//   //         },
//   //       },
//   //       {
//   //         upsert: true,
//   //         new: true,
//   //       }
//   //     );
//   //     console.log(`add cart:::`, addToCart);

//   //     return 1; // neu thanh cong
//   //   }
//   // },
// });
