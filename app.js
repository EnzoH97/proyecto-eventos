import express from "express";
import passport from "./src/config/passport.config.js";

import eventsRouter from "./src/routes/events.router.js";
import sessionsRouter from "./src/routes/sessions.router.js";
import ticketRouter from "./src/routes/tickets.router.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());


app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Servidor activo"
    });
});


app.use("/api/events", eventsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/tickets", ticketRouter);


export default app;