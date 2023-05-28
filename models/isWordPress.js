// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
import { Schema, model, models } from 'mongoose';

const isWordPress = new Schema({
    url: {
        type: String,
        required: true,
    },
    wordPessSite: {
        type: Boolean,
        required: true,
    },

}, { timestamps: true });

const IsWordPress = models.IsWordPress || model('Business', isWordPress);

export default isWordPress;