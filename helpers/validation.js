const Joi = require('joi')
// read docs
const userValidate = data => {
    const userSchema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        passWord: Joi.string().min(4).max(32).required()
    })

    return userSchema.validate(data)
}

module.exports = {
    userValidate
}