import passport from "../config/passport.config.js"

export const authenticationMiddleware = (req, res, next) =>{
    passport.authenticate("current", {session: false}, (err, user, info)=>{
        if(err || !user){
            return res.status(401).json({
                status: "error",
                message: "No autenticado"
            })
        }

        req.user = user
        next()
    } )(req, res, next)
}