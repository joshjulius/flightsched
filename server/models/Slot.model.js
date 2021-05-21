import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false,
        // default: customer name
    },
    aircraft: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true // false if solo
    },
    flightType: {
        type: String,
        required: true
    },
    flightRoute: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    // for admin roles
    internalComments: {
        type: String,
        required: false
    },
    // notifications: {

    // }
});

const Slot = mongoose.model('slot', SlotSchema);

export default Slot;