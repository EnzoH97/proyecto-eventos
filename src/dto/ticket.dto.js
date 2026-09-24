export class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id;
        this.event = TicketDTO.#formatEvent(ticket.event);
        this.user = TicketDTO.#formatUser(ticket.user);   // ← nuevo
        this.quantity = ticket.quantity;
        this.status = ticket.status;
        this.reservationCode = ticket.reservationCode;
    }

    static #formatEvent(event) {
        if (!event) return event;
        if (!event.title) return event;
        return {id: event._id, title: event.title, date: event.date, location: event.location };
    }

        static #formatUser(user) {
        if (!user) return user;
        return user._id ? user._id.toString() : user.toString();
    }
}
