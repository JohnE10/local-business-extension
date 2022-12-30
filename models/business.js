// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
import { Schema, model, models } from 'mongoose';

const business = new Schema({
    name: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
    search: {
        type: String,
        required: false,
    },
    entry: {
        type: Number,
        required: false,
    }
}, { timestamps: true });

const Business = models.Business || model('Business', business);

export default Business;