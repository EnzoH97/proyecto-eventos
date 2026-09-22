export class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id;
        this.event = TicketDTO.#formatEvent(ticket.event);
        this.quantity = ticket.quantity;
        this.status = ticket.status;
        this.reservationCode = ticket.reservationCode;
    }

    static #formatEvent(event) {
        if (!event) return event;
        // Si vino sin popular, event es solo un ObjectId (o string)
        if (!event.title) return event;
        return {
            id: event._id,
            title: event.title,
            date: event.date,
            location: event.location
        };
    }
}