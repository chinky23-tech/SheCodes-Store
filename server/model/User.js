const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
email: { type: String, required: true, unique:true},
password: {type: String, required: true},
name: {type: String, required: true}
},{timestamps: true});
// hash password

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12); //12 salt rounds
    next();
});
// security compare pasword for login
userSchema.methods.correctPassword = async function (candidatePassowrd, userPassword) {
    
    return await bcrypt.compare(candidatePassowrd, userPassword);
}

module.exports = mongoose.model('User', userSchema);