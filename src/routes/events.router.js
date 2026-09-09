import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";
import { authorizeEventOwnerOrAdmin } from "../middlewares/authorizeEventOwnerOrAdmin.js"
import { authenticationMiddleware } from "../middlewares/autheticationMiddleware.js";
import {createEventController, getEventsController, getEventByIdController, updateEventController} from "../controllers/events.controller.js";

const router = Router();


// -----------------------------------------------------
// Crear un evento
// -----------------------------------------------------
router.post("/", authenticationMiddleware, authorizeRoles(
    [
        "organizer", 
        "admin"
    ]), createEventController);

// -----------------------------------------------------
// Listar eventos
// -----------------------------------------------------

router.get("/", getEventsController);

// -----------------------------------------------------
// Ver detalle de un evento
// -----------------------------------------------------

router.get("/:eventId", authenticationMiddleware, getEventByIdController);

// -----------------------------------------------------
// Editar un evento
// -----------------------------------------------------

router.put("/:eventId", authenticationMiddleware, authorizeRoles(
    [
        "organizer", 
        "admin"
    ]), authorizeEventOwnerOrAdmin, updateEventController);

export default router;