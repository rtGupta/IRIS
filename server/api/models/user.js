import mongoose from "mongoose";

// Schema of userDetails and required field Validations 
const Schema = mongoose.Schema({
    firstName: {
        type: String,
        required: 'First Name cannot be blank.'
    },
    lastName: {
        type: String,
        required: 'Last Name cannot be blank.'
    },
    address: {
        type: String,
        required: 'Address cannot be blank.'
    },
    phoneNumber: {
        type: String,
        required: 'Phone number cannot be blank.'
    },
    emailID: {
        type: String,
        required: 'Email ID cannot be blank.'
    },
    password: {
        type: String,
        default: "Hello@Iris"
    },
    role: {
        type: String
        // required: 'User Role cannot be blank.'   
    },
    zipCodeMin: {
        type: String
    },
    zipCodeMax: {
        type: String
    },
    userCreatedDate: {
        type: Date,
        default: Date.now
    },
    token: { 
        type: String 
    }
},{ skipVersioning: true});

// Adding id to the request and converting to json
Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true });

const userModel = mongoose.model('user', Schema);

export default userModel;