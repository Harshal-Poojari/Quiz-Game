import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Ensures no duplicate emails
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Create a user model 
const User = mongoose.model('User', userSchema);

// Export the user model
export default User;
