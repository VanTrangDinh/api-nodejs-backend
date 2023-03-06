const {client} =require('../helpers/init.redis')


const addDelayEventOrder = ({orderId, delay}) => {
    return new Promise((resolve, reject) => {
        client.set(orderId, "Cancel order", "EX", delay, (err, result) => {
            if(err) return reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    addDelayEventOrder
}