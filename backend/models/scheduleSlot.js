import mongoose from 'mongoose';

const scheduleSlotSchema = new mongoose.Schema({
    bookableItem: { type: mongoose.Schema.Types.ObjectId, ref: 'bookableItem', required: true },
    date: { type: Date, required: true },
    timeSlots: [{
        startTime: { type: String, required: true }, // format 'HH:mm'
        isAvailable: { type: Boolean, default: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

const ScheduleSlot = mongoose.model('ScheduleSlot', scheduleSlotSchema);

export default ScheduleSlot;
