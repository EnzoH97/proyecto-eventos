import sessionsService from "../services/sessions.service.js";
import { generateJWT } from "../utils/jwt.js";

export const register = async (req, res) => {
    try{
        const result = await sessionsService.register(req.body);
        return res.status(201).json({
            status: "success",
            payload: result
        });
    }catch(error){
        if(error.message === "EMAIL_EXISTS"){
            return res.status(409).json({
                status: "error",
                message: "El email ya está registrado"
            });
        }

        return res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

export const login = async(req,res)=>{
    try{
        const tokenUser = await sessionsService.login(req.body)
        const token = generateJWT(tokenUser)

        res.cookie("currentUser",token,{
            httpOnly: true,
            maxAge: process.env.JWT_EXPIRE_IN,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })

        return res.status(200).json({
            status: "success",
            message: "login correcto",
        })

    }catch(error){
    res.status(500).json({
        status: "error",
        message: error.message
    })
    }
};

export const logout = async(req, res)=>{
    res.clearCookie("currentUser")
    return res.status(200).json({
        status: "success",
        message: "La sesión se cerro correctamente"
    })
};

export const getCurrentUser = async(req, res)=>{
    return res.status(200).json({
        status: "success",
        payload: req.user
    })
};