export const errorHandler = (err, req, res, next) => {
    console.error("Error capturado:", err);

    const status = err.status || err.statusCode || 500;

    return res.status(status).json({
        status: "error",
        message: err.message || "Error interno del servidor",
        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack
        })
    });
};