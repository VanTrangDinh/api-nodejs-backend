const express = require('express');
const routes = express.Router();
const logEvents = require('../helpers/logEvent');
const { v4: uuid } = require('uuid');
const createError = require('http-errors');

//controller ecommerce
const {
  addInventory,
  addProduct,
  addToCart,
} = require('../controllers/ecommerce.controller.js');
routes.put('/v1/ecommerce/products', addProduct);
routes.put('/v1/ecommerce/inventories', addInventory);
routes.put('/v1/ecommerce/addToCart', addToCart);

//replay attack
const {
  listPlayerByBlub,
} = require('../controllers/replay.controller');
routes.get(
  '/v1/services/listPlayerByBlub',
  listPlayerByBlub
);

// const {
//   addInventory,
//   addProduct,
//   addToCart,
// } = require('../controllers/ecommerce.controller');
// route ecommerce
// routes.put('/v1/ecommerce/products', addProduct);
// routes.put('/v1/ecommerce/inventories', addInventory);
// routes.put('/v1/ecommerce/addToCart', addToCart);

//methods of mongoose
const {
  getMethods,
  getStatics,
  //createUser,
  regisUser,
  verifyOtp,
} = require('../controllers/user.controller');

routes.get('/v1/services/getMethods', getMethods);
routes.get('/v1/services/getStatics', getStatics);
//routes.post('/v1/users', createUser);
routes.post('/v1/users', regisUser);
routes.post('/v1/users/verify', verifyOtp);

routes.use((err, req, res, next) => {
  logEvents(
    `idError-----${uuid()}-----${req.url}-----${
      req.method
    }-----${err.message}`
  );
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

/* 
- "/abc" <=> /abc
- "/ab?cd" <=> /acd or /abcd
- "/ab+cd" <=> /abcd or /abbbbcd or /abbbbbbbcd vvv
- "/ab*cd" <=> '/ab' + anything  + 'cd' ex: abcd, abjhhjdjhsjcd, ab1323cd
- /a/ <=> RegExp anything that contains "a": không có ngoặc ''
- /.*flys$/ <=> RegExp anything  that ends with "fly"  ex: butterfly  and  dragonfly

*/

module.exports = routes;
