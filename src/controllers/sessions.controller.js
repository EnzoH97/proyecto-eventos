import { AuthService } from "../services/sessions.service.js";
import { UserDTO } from "../dto/user.dto.js";

const authService = new AuthService();

export const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
        status: "success",
        message: "Usuario registrado",
        data: new UserDTO(user)
        });
    } catch (error) {
        next(error);
    }
    };

    export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "email y password son obligatorios"
        });
        }

        const result = await authService.login(email, password);

        res.json({
        status: "success",
        message: "Login exitoso",
        ...result
        });
    } catch (error) {
        next(error);
    }
};