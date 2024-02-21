const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(user.password, salt);
//         user.password = hashedPassword;
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
