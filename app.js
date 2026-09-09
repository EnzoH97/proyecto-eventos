import express from "express";
import eventsRouter from "./src/routes/events.router.js";
import sessionsRouter from "./src/routes/sessions.router.js";
import cookieParser from "cookie-parser";
import passport from "./src/config/passport.config.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Servidor activo"
    });
});


app.use("/api/events", eventsRouter);
app.use("/api/sessions", sessionsRouter);



export default app;