import mongoose from "mongoose";

import { TicketRepository } from "../repository/ticket.repository.js";
import { EventRepository } from "../repository/event.repository.js"
import { EmailService } from "./email.service.js";
import { generateTicketCode } from "../utils/ticketCode.js";

const businessError = (message, status = 400) => Object.assign(new Error(message), { status });

export class TicketService {
    constructor(){
        this.ticketRepository = new TicketRepository();
        this.eventRepository = new EventRepository();
        this.emailService= new EmailService();
    }

    validateObjectId(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw businessError("ID de Ticket inválido", 400);
        }
    }

    validateQuantity(quantity){
        const value = Number(quantity)
        if(!Number.isInteger(value)|| value < 1){
            throw businessError("La cantidad de lugares debe ser mayor a 0",400);
        }
        return value
    }

    async enroll(user, eventId, quantity){
        this.validateObjectId(eventId)
        const seats = this.validateQuantity(quantity)

        const event = await this.eventRepository.findById(eventId)
        if(!event){
            throw businessError("Evento no encontrado", 404);
        }

        if(event.status !== "published"){
            throw businessError("El evento no esta disponible para anotarse", 400);
        }

        if(event.date < new Date()){
            throw businessError("El evento ya finalizo", 400);
        }

        const existingTicket = await this.ticketRepository.findByUserAndEvent(user._id, event._id, "confirmed");

        if(existingTicket){
            throw businessError("El ususario ya se encuentra anotado en el evento", 409);
        }

        const reservedtEvent = await this.eventRepository.reserveSeats(event._id, seats);
        if(!reservedtEvent){
            throw businessError("No hay cupos disponibles");
        }
        
        let ticket = null
        try{
            ticket =  await this.ticketRepository.create({
                user: user._id,
                event: event._id,
                quantity: seats,
                status: "confirmed",
                reservationCode: generateTicketCode()
            })
        }catch(error){
            await this.eventRepository.releaseSeats(event._id, seats)
            throw error
        }
        await this.emailService.sendTicketConfirmation(user, event, ticket)
        return ticket
    }

    async getTicketsFromUser(user){
        return this.ticketRepository.findByUser(user._id)
    }

    async getTicketsByEvent(eventId){
        this.validateObjectId(eventId)
        return this.ticketRepository.findByEvent(eventId)
    }

    async cancelTicket(user, ticketId){

        this.validateObjectId(ticketId)
        const existantTicket = await this.ticketRepository.findById(ticketId)

        if(!existantTicket){
            throw businessError("Ticket no encontrado", 404);
        }

        const isAdmin = user.role === "admin";
        const ticketUserId = existantTicket.user._id.toString();
        const isOwner = ticketUserId === user._id.toString();

        if(!isAdmin && !isOwner){
            throw businessError("no tenes permisos para cancelar este ticket", 403);
        }

        if(existantTicket.status === "cancelled"){
            throw businessError("Ticket ya cancelado", 409);
        }

        existantTicket.status = "cancelled"
        existantTicket.cancelledAt = new Date()
        const cancelled = await this.ticketRepository.save(existantTicket);

        const eventId = existantTicket.event?._id || existantTicket.event;

        await this.eventRepository.releaseSeats(eventId, existantTicket.quantity)

        await this.emailService.sendTicketCancellation(user, existantTicket.event, existantTicket)

        return cancelled
    }

}