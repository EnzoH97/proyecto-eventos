import { Router } from "express";
import { createEvent, getEvents, getEventById, updateEvent, changeEventStatus} from "../controllers/events.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

const router = Router();


// -----------------------------------------------------
// Ver eventos (Público)
// -----------------------------------------------------
router.get("/", getEvents);
router.get("/:id", getEventById);

// -----------------------------------------------------
// Crear un evento (Organizer o admin) 
// -----------------------------------------------------
router.post("/",authenticateJWT,authorizeRoles("organizer", "admin"),createEvent);

// -----------------------------------------------------
// Editar un evento (Dueño o admin)
// -----------------------------------------------------
router.put("/:id",authenticateJWT,authorizeRoles("organizer", "admin"),updateEvent);
router.patch("/:id/status",authenticateJWT,authorizeRoles("organizer", "admin"),changeEventStatus);

export default router;