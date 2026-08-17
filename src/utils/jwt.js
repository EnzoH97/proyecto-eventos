import jwt from "jsonwebtoken"

let secret = process.env.JWT || "secret"


export const generateJWT = (user) =>{
    return jwt.sign(user, secret,{
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    })
}

export const verifyJWT= (token)=>{
    return jwt.verify(token, secret)
}