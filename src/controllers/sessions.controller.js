import { UserService } from "../services/sessions.service.js";

const userService = new UserService();

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------

export const register = async (req, res, next) => {
    try {
        const user = await userService.register(req.body);

        res.status(201).json({
        status: "success",
        message: "Usuario registrado",
        data: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }
        });
    } catch (error) {
        next(error);
    }
};

// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "email y password son obligatorios"
        });
        }

        const result = await userService.login(email, password);

        res.json({
        status: "success",
        message: "Login exitoso",
        ...result
        });
    } catch (error) {
        next(error);
    }
};