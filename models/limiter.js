const client = require('../helpers/init.redis');



// viết fucntion setkey: có ip này rồi thì cộng lên
// trong redis, mongoDB có thuật toán atome, chỉ một câu lệnh vừa timg vừa update
// dùng async await cũng ok, 
const incr = key => {
  return new Promise((resolve, reject) => {
    //khoi tạo key = 1, nếu gọi lại set key = 2, 3, ..
    client.incr(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  incr,
};
