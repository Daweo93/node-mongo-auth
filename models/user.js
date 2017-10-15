const mongose = require('mongoose');
const Schema = mongose.Schema;

// Define user model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// Create the model class
const UserModel = mongose.model('user', userSchema);

// Export the model
module.exports = UserModel;
