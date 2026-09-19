import { Router } from "express"

import { authenticateJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {enroll, getTicketsFromUser, getTicketsByEvent, cancelTicket} from "../controllers/ticket.controller.js"

const router = Router();

// -----------------------------------------------------
// CREAR TICKETS
// -----------------------------------------------------
router.post("/event/:eid/tickets", authenticateJWT, enroll)

// -----------------------------------------------------
// OBTENER TICKETS (user)
// -----------------------------------------------------
router.get("/my-tickets", authenticateJWT, getTicketsFromUser)

// -----------------------------------------------------
// OBTENER TICKETS (event)
// -----------------------------------------------------
router.get("/event/:eid/tickets", authenticateJWT,authorizeRoles("organizer", "admin"), getTicketsByEvent)

// -----------------------------------------------------
// CANCELAR TICKET
// -----------------------------------------------------
router.patch("/:tid/cancel",authenticateJWT, cancelTicket)

export default router