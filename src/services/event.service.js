import eventDAO from "../dao/event.dao.js";

class EventService {
    async createEvent({ name, date, capacity }, organizerId) {
        const newEvent = await eventDAO.createEvent({
        name,
        date,
        capacity,
        organizer: organizerId
        });
        return newEvent;
    }

    async getEvents() {
        return await eventDAO.getEvents();
    }

    async getEventById(id) {
        const event = await eventDAO.getEventById(id);

        if (!event) {
        const error = new Error("Evento no encontrado");
        error.code = "EVENT_NOT_FOUND";
        throw error;
        }
        return event;
    }

    async updateEvent(id, eventData) {
        const event = await eventDAO.updateEvent(id, eventData);

        if (!event) {
        const error = new Error("Evento no encontrado");
        error.code = "EVENT_NOT_FOUND";
        throw error;
        }
        return event;
    }
}

export default new EventService();