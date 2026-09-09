
export const errorHandler = (err, req, res, next) => {

    console.error("❌ Error capturado por el handler:", err);
    
    const statusCode = err.statusCode || err.status || 500;
    return res.status(statusCode).json({
        status: "error",
        message: err.message || "Error interno del servidor",

        ...(process.env.NODE_ENV !== "production" && {
        detail: err.detail || err.message,
        stack: err.stack
        })
    });
};