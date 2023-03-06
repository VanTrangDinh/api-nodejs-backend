// // create asign

// //copy cong thuc taoj asign tu client
// // npm i md5 --save-dev /// k nen dung
// const md5 = require('md5')
// module.exports = {
//     genSign: params => {
//         const keyToken = 'xxxxYYYYY';
        
//         const sortKeys = [];
//         paramsHolder.keyToken = keyToken;
//         paramsHolder.v = 'v1'; // version, keyToken doi lien tuc theo thang
        

//         for (const key in params) {
//           if (key != 'sign') {
//             //{club: 'manu', sign: 'aaaaa'}
//             sortKeys.push(key); //club: 'manu'
//           }
//         }

//         sortKeys.sort(); //sort of ASCII

//         let paramsHolder = '';

//         sortKeys.forEach((key) => {
//           paramsHolder += key + paramsHolder[key]; //clubmanu
//         });

//         console.log(`paramsHolder:::${paramsHolder}`)
        
//         return md5(paramsHolder).toString();
    
// }}