import mongoose from "mongoose";

// Schema of caller request type and required field Validations 
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    contact: {
        type: String,
        required: 'Phone number is required'
    },
    address: {
        type: String,
        required: 'Address is required.'
    },
    vitals: {
        type: {
            oxygenLevel: String,
            temperature: String,
            heartRate: String,
            systolic: String,
            diastolic: String
        }
    },
    medicalHistory: {
        type: [String],
        enum: ["Cancer", "Chronic Kidney Disease", "Diabetes", "Heart Conditions", "HIV Infection", "Dementia", "Pregnancy", "Smoking, current or former", "Tuberculosis"]
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    bloodGroup: {
        type: String
    }

},{versionKey: false});

// Adding id to the request and converting to json
Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', {virtuals : true});

const model = mongoose.model('Caller', Schema);

export default model;