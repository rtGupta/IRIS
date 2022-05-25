import mongoose from "mongoose";

// Schema of request and required field Validations 
const Schema = mongoose.Schema({
    caller: {
        type: {
            callerId: String,
            callerName: String,
            callerAddress: String,
            callerContact: String
        },
        required: 'Caller is required.'
    },
    message: {
        type: String,
        required: 'Message is required.'
    },
    status: {
        type: String
    },
    emergencyLevel: {
        type: String,
        default: 'A'
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: [Object],
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    resolveDate: {
        type: Date,
        default: Date.now
    },
    isIRISeligible: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// Adding id to the request and converting to json
Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true });

const requestModel = mongoose.model('Request', Schema);

export default requestModel;