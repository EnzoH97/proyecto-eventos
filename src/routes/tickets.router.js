import { Router } from "express"

import { authenticateJWT } from "../middlewares/auth.middleware.js"
import {getTicketsFromUser, cancelTicket} from "../controllers/ticket.controller.js"

const router = Router();



// -----------------------------------------------------
// OBTENER TICKETS (user)
// -----------------------------------------------------
router.get("/my-tickets", authenticateJWT, getTicketsFromUser)


// -----------------------------------------------------
// CANCELAR TICKET
// -----------------------------------------------------
router.patch("/:tid/cancel",authenticateJWT, cancelTicket)

export default router