import usersRepository from "../repository/users.repository.js";
import { createHash, validatePassword } from "../utils/hash.js";

class SessionsService {

    async register(data){
        const{
            first_name,
            last_name,
            email,
            password
        }=data;

        if(
            !first_name ||
            !last_name ||
            !email ||
            !password
        ){
            throw new Error("faltan campos obligatorios");
            
        }

        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(normalizedEmail)){
            throw new Error("El Email es inválido");
        }

        if(password.length < 8){
            throw new Error("La password es inválida");
        }

        const existingUser =await usersRepository.getByEmail(normalizedEmail);

        if(existingUser){
            throw new Error("EMAIL_EXISTS");
        }

        const hashedPassword = await createHash(password);

        const user = await usersRepository.create({
            first_name,
            last_name,
            email: normalizedEmail,
            password: hashedPassword
        });

        return{
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        };
    }

    async login(data){

    const { email, password } = data

    if(!email || !password){
        throw new Error("faltan credenciales")
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await usersRepository.getByEmail(normalizedEmail)

    if(!user){
        throw new Error("credenciales invalidas")
    }

    const validPassword = await validatePassword(password, user.password)

    if(!validPassword){
        throw new Error("credenciales invalidas")
    }

    return {
        id: user._id,
        email: user.email,
        role: user.role
    }

    }
}

export default new SessionsService();