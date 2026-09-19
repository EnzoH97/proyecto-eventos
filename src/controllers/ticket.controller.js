import { TicketService } from "../services/ticket.service.js";

const ticketService = new TicketService()

export const enroll = async (req, res, next)=>{
    try{

        const { eid } = req.params
        const { quantity } = req.body
        const ticket = await ticketService.enroll(req.user, eid, quantity)

        res.status(201).json({
            status: "success",
            massage: "Incripcion realizada con exito",
            data: {
                id: ticket._id,
                event: ticket.event,
                quantity: ticket.quantity,
                status: ticket.status,
                reservationCode: ticket.reservationCode
            }
        })
    }catch(error){
        next(error)
    }
}

export const getTicketsFromUser = async(req, res, next)=>{
    try{
        const tickets = await ticketService.getTicketsFromUser(req.user)
        res.status(201).json({
                status: "success",
                massage: "Listado de ticket obtenida correctamente",
                data: tickets
            })
    }catch(error){
        next(error)
    }
}
    
export const getTicketsByEvent = async(req, res, next)=>{
    try {
        const { eid } = req.params
        const tickets = await ticketService.getTicketsByEvent(eid)
        res.status(201).json({
                status: "success",
                massage: "Listado de ticket obtenida correctamente",
                data: tickets
            })
    } catch (error) {
        next(error)
    }
}

export const cancelTicket = async(req, res, next)=>{
    try {
        const {tid} = req.params
        const cancelled = await ticketService.cancelTicket(req.user, tid)
        res.status(201).json({
                status: "success",
                massage: "Ticket cancelado correctamente",
                data: cancelled
            })
    } catch (error) {
        next(error)
    }
}