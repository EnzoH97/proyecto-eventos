import express from "express";
import eventsRouter from "./src/routes/events.router.js";
import sessionsRouter from "./src/routes/sessions.router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
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