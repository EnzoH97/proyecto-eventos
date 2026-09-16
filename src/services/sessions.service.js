import userDAO from "../dao/user.dao.js";
import { createHash } from "../utils/hash.js";

class UserService {

// -----------------------------------------------------
// REGISTER LOCAL
// -----------------------------------------------------

async registerUser({
    first_name,
    last_name,
    email,
    password
    }) {

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)){
        throw new Error("El Email es inválido");
    }

    if (password.length < 8){
        throw new Error("La password es inválida");
    }
    
    const existingUser = await userDAO.getUserByEmail(normalizedEmail);

    if (existingUser) {
    const error = new Error(
    "El email ya está registrado"
    );
    error.code = "EMAIL_EXISTS";
    throw error;
    }

    const hashedPassword = await createHash(password);
    const newUser = await userDAO.createUser({
        first_name,
        last_name,
        email: normalizedEmail,
        password: hashedPassword,
        role: "user",
        provider: "local",
        providerId: null
        });

    return newUser;
    }

// -----------------------------------------------------
// REGISTER GITHUB
// -----------------------------------------------------

async registerGithubUser({
    first_name,
    last_name,
    email,
    providerId
    }) {
    const normalizedEmail = email.trim().toLowerCase();

    // Buscar usuario existente

    let user = await userDAO.getUserByEmail(normalizedEmail);

    // Si ya existe, lo devolvemos
    if (user) {
    return user;
    }


    // Si no existe, creamos usuario GitHub
    user = await userDAO.createUser({
        first_name,
        last_name,
        email: normalizedEmail,
        password: null,
        role: "user",
        provider: "github",
        providerId
        });
    return user;
    }
}

export default new UserService();