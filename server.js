import "dotenv/config"
import app from "./app.js";
import {connectDB} from "./src/config/database.js"

const PORT = process.env.PORT
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});