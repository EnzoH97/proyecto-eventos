import passport from "passport";
import { UserDTO } from "../dto/user.dto.js";
import { parseDurationToMs } from "../utils/jwt.js";

const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: parseDurationToMs(process.env.JWT_EXPIRES_IN)
});

export const register = (req, res, next) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: info?.message || "No se pudo registrar el usuario"
            });
        }
        res.status(201).json({
            status: "success",
            message: "Usuario registrado",
            data: new UserDTO(user)
        });
    })(req, res, next);
};

export const login = (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, result, info) => {
        if (err) return next(err);
        if (!result) {
            return res.status(401).json({
                status: "error",
                message: info?.message || "Credenciales inválidas"
            });
        }

        res.cookie("currentUser", result.token, cookieOptions());

        res.json({
            status: "success",
            message: "Login exitoso",
            data: result.user
        });
    })(req, res, next);
};

export const current = async (req, res, next) => {
    try {
        res.json({
            status: "success",
            data: new UserDTO(req.user)
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("currentUser", cookieOptions());
        return res.status(200).json({
            status: "success",
            message: "Logout correcto"
        });
    } catch (error) {
        next(error);
    }
};
