export class TicketDTO{
    constructor(ticket){
        this.id = ticket._id;
        this.event = ticket.event;
        this.quantity = ticket.quantity;
        this.status = ticket.status;
        this.reservationCode = ticket.reservationCode;
    }

}