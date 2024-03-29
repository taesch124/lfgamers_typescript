import * as mongoose from 'mongoose';
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    favoriteGames: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Game'
        }
    ]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;