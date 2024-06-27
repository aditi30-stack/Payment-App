const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config()

const dbConnection = async() =>{
    try{
   const connection =  await mongoose.connect(process.env.MONGO_URL)
   console.log("Db connected")
    }catch(error) {
        console.log("Cannot connect to database")
    }

}

dbConnection();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        minLength: 8,
        maxLength: 30
    },
    
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required:true,
        trim:true,
        maxLength:50
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    balance: {
        type: Number,
        required: true

    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    User,
    Account
}