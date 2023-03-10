const {model, Schema, ObjectId} = require('mongoose') 


const users = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = model('Users', users)