import { TicketService } from "../services/ticket.service.js";
import { TicketDTO } from "../dto/ticket.dto.js";

const ticketService = new TicketService()

export const enroll = async (req, res, next)=>{
    try{

        const { eid } = req.params
        const { quantity } = req.body
        const ticket = await ticketService.enroll(req.user, eid, quantity)

        res.status(201).json({
            status: "success",
            message: "Incripcion realizada con exito",
            data: new TicketDTO(ticket)
        })
    }catch(error){
        next(error)
    }
}

export const getTicketsFromUser = async(req, res, next)=>{
    try{
        const tickets = await ticketService.getTicketsFromUser(req.user)
        res.status(200).json({
                status: "success",
                message: "Listado de ticket obtenida correctamente",
                data: tickets.map(t => new TicketDTO(t))
            })
    }catch(error){
        next(error)
    }
}
    
export const getTicketsByEvent = async(req, res, next)=>{
    try {
        const { eid } = req.params
        const tickets = await ticketService.getTicketsByEvent(eid, req.user)
        res.status(200).json({
                status: "success",
                message: "Listado de ticket obtenida correctamente",
                data: tickets.map(t => new TicketDTO(t))
            })
    } catch (error) {
        next(error)
    }
}

export const cancelTicket = async(req, res, next)=>{
    try {
        const {tid} = req.params
        const cancelled = await ticketService.cancelTicket(req.user, tid)
        res.status(200).json({
                status: "success",
                message: "Ticket cancelado correctamente",
                data: new TicketDTO(cancelled)
            })
    } catch (error) {
        next(error)
    }
}