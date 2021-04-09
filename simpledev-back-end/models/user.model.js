const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, required: true, unique: true, trim: true, lowercase: true, minlength: 3 },
    password: { 
        type: String, required: true },
    email: {
        type: String, trim: true, lowercase: true, unique: true, required: true,
    },
    role:{
        type:String, default:"USER"
    }
}, 
{
  timestamps: true,
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret.password;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;