// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
import { Schema, model, models } from 'mongoose';

// const business = new Schema({
//     name: {
//         type: String,
//         required: false,
//     },
//     url: {
//         type: String,
//         required: false,
//     },
//     search: {
//         type: String,
//         required: false,
//     },
//     email: {
//         type: String,
//         required: false,
//     },
//     numberOfEmails: {
//         type: Number,
//         required: false,
//     },

//     dateEmailedLast: {
//         type: Date,
//         required: false,
//     }
// }, { timestamps: true });

const business = new Schema({
    name: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    advertising: {
        type: String,
        required: false,
    },
    rating: {
        type: String,
        required: false,
    },
    reviews: {
        type: String,
        required: false,
    },
    industry: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    search: {
        type: String,
        required: false,
    },

    numberOfEmails: {
        type: Number,
        required: false,
    },

    dateEmailedLast: {
        type: Date,
        required: false,
    }
}, { timestamps: true });

const Business = models.Business || model('Business', business);

export default Business;