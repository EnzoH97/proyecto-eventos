import eventService from "../services/event.service.js";


// -----------------------------------------------------
// CREAR EVENTO
// -----------------------------------------------------


export const createEventController = async (req, res, next) => {
    try {
        const { name, date, capacity, organizer } = req.body;
        const owner = req.user ? req.user._id : organizer;
        const newEvent = await eventService.createEvent({
            name,
            date,
            capacity
        }, owner);
        return res.status(201).json({
            status: "success",
            payload: newEvent
        });
    } catch (error) {
        next(error);
    }
};

// -----------------------------------------------------
// READ ALL
// -----------------------------------------------------

export const getEventsController = async (req, res, next) => {
    try {
        const events = await eventService.getEvents();
        return res.status(200).json({
            status: "success",
            payload: events
        });
    } catch (error) {
        next(error);
    }
};

// -----------------------------------------------------
// READ ONE
// -----------------------------------------------------

export const getEventByIdController = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const event = await eventService.getEventById(eventId);
        return res.status(200).json({
            status: "success",
            payload: event
        });
    } catch (error) {
        next(error);
    }
};

// -----------------------------------------------------
// UPDATE
// -----------------------------------------------------

export const updateEventController = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const event = await eventService.updateEvent(eventId, req.body);
        return res.status(200).json({
            status: "success",
            payload: event
        });
    } catch (error) {
        next(error);
    }
};