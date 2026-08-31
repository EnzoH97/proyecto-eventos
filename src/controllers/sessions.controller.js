import { generateToken } from "../utils/jwt.js";
import { UserDTO } from "../dto/user.dto.js";

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------

export const register = async (req, res) => {
    return res.status(201).json({
        status: "success",
        message: "Usuario registrado correctamente"
    });
};

// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------

export const login = async (req, res) => {
    try {
        const user = req.user;
        const token = generateToken(user);
        res.cookie("currentUser", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });
        return res.status(200).json({
            status: "success",
            message: "Login correcto"
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};

//   GITHUB

export const githubCallback = async(req, res) => {
    try {
        const token = generateToken(req.user);
        res.cookie("currentUser", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        return res.json({
            status: "success",
            message: "Login con GitHub exitoso"
        });

    } catch(error){
        return res.status(500).json({
            status: "error",
            message: "Error durante la autenticación"
        });
    }
};

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

export const logout = async(req, res) => {
    res.clearCookie("currentUser");
    return res.status(200).json({
        status: "success",
        message: "La sesión se cerro correctamente"
    })
};

// -----------------------------------------------------
// CURRENT
// -----------------------------------------------------

export const current = async(req, res)=>{
    try {
        const user = req.user;
        const userDTO = new UserDTO(user);

        return res.status(200).json({
            status: "success",
            payload: userDTO
        })

    } catch(error){
        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};