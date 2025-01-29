import ScheduleSlot from '../models/scheduleSlot';

// add time frame to a bookable item
const addScheduleSlot = async (req, res) => {

    const { bookableItemId, date, timeSlots } = req.body;

    try {
        const bookableItem = await bookableItem.findById(bookableItemId);
        if (!bookableItem) {
            return res.status(404).json({ success: false, message: 'Bookable item not found' });
        }

        // verify if the schedule existe for a given date
        let schedule = await ScheduleSlot.findOne({ bookableItem: bookableItemId, date });

        if (schedule) {
            // add a new schedule to an existing date
            schedule.timeSlots.push(...timeSlots);
        } else {
            // create a new schedule
            schedule = new ScheduleSlot({
                bookableItem: bookableItemId,
                date,
                timeSlots
            });
        }

        await schedule.save();
        res.json({ success: true, schedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// get all the schedules for a date and element
const getAvailableSlots = async (req, res) => {
    const { bookableItemId, date } = req.params;

    try {
        const schedule = await ScheduleSlot.findOne({
            bookableItem: bookableItemId,
            date: new Date(date)
        });

        if (!schedule) {
            return res.status(404).json({ success: false, message: 'No available slots for this date' });
        }

        // filter available schedules
        const availableSlots = schedule.timeSlots.filter(slot => slot.isAvailable);
        res.json({ success: true, availableSlots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Reserve a schedule
const bookSlot = async (req, res) => {
    const { name, email, createdAt, bookableItemId, date, startTime, endTime } = req.body;

    try {
        // verify availaibility for a date
        const schedule = await ScheduleSlot.findOne({
            bookableItem: bookableItemId,
            date: new Date(date),
            'timeSlots.startTime': startTime,
            'timeSlots.isAvailable': true
        });

        if (!schedule) {
            return res.status(400).json({ success: false, message: 'Time slot not available' });
        }

        // mark a schedule as reserved
        const slotIndex = schedule.timeSlots.findIndex(slot => slot.startTime === startTime && slot.endTime === endTime);
        if (slotIndex !== -1) {
            schedule.timeSlots[slotIndex].isAvailable = false;
            await schedule.save();

            //creating the booking
            const bookingData = {
                name,
                email,
                bookableItem: bookableItemId,
                startDate: new Date(`${date}T${startTime}`),
                createdAt: Date.now()
            }

            const booking = new bookModel(bookingData);
            await booking.save()

            res.json({ success: true, booking });
        } else {
            res.status(400).json({ success: false, message: 'Time slot not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


