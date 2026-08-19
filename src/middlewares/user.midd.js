import { verifyJWT } from "../utils/jwt.js";


export const authMiddleware = async (req,res, next)=>{
    try{
        
        const token = req.cookies.currentUser
        if(!token){
            return res.status(401).json({
                status: "error",
                message: "no autenticado"
            })
        }
        const decoded = verifyJWT(token)
        req.user = decoded
        next()

    }catch(error){
        return res.status(401).json({
            status: "error",
            message: "token invalido o expirado"
        })
    }
}