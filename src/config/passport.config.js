import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import userDAO from "../dao/user.dao.js"
import userService from "../services/sessions.service.js";
import { isValidPassword } from "../utils/hash.js";

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------

passport.use("register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
    },
    async (req, email, password, done) => {
        try{
            const {first_name, last_name} = req.body;
            // VALIDACIONES
            if (
                !first_name ||
                !last_name ||
                !email ||
                !password
            ){
                return done(null, false,{
                    message: "Todos los campos son obligatorios"
                });
            }
        
        // Crear un usuario mediante Service
        const newUser = await userService.registerUser({
            first_name,
            last_name,
            email,
            password
        });
        return done(null, newUser);
        } catch (error){
            if(error.code === "EMAIL_EXISTS" || error.message === "El Email es inválido" || error.message === "La password es inválida"
            ){
                return done(null, false,{
                    message: error.message
                });
            }
            return done(error);
        }
    })
);

// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------

passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
async (email, password, done) => {
    try{
        const normalizedEmail = email.trim().toLowerCase();
        const user = await userDAO.getUserByEmail(normalizedEmail);

        if(!user){
            return done(null, false, {
                message: "Credenciales inválidas"
            });
        }

        const validPassword = await isValidPassword(password, user.password);
        if (!validPassword){
            return done(null, false, {
                message: "Credenciales inválidas"
            });
        }

        return done(null, user);
    }catch(error){
        return done(error);
    }
}
));

// -----------------------------------------------------
// LOGIN GITHUB
// -----------------------------------------------------

passport.use("github", new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:process.env.GITHUB_CALLBACK_URL
},
async(accessToken, refreshToken, profile, done) => {
    try {
        console.log("GitHub profile:", profile);
        //OBTENER EMAIL
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(null, false, {
                message: "Github no proporciono un email"
            });
        }

        //OBTENER NOMBRE
        const first_name = profile.name?.givenName || profile.displayName || "Usuario";

        //OBTENER APELLIDO
        const last_name = profile.name?.familyName || "";

        //BUSCAR / CREAR USUARIO
        const user = await userService.registerGithubUser({
            first_name,
            last_name,
            email,
            providerId: profile.id
        });

        return done(null, user);
    } catch(error){
        console.log("Error GitHub:", error);
        return done(error);
    }
}
));

// -----------------------------------------------------
// COOKIE EXTRACTOR
// -----------------------------------------------------

const cookieExtractor = (req) => {
    if (req && req.cookies && req.cookies.currentUser) {
        return req.cookies.currentUser;
    }
    return null;
};

// -----------------------------------------------------
// CURRENT
// -----------------------------------------------------

passport.use("current", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([ cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
},
    async(payload, done) => {
        try {
            const user = await userDAO.getUserById(payload.id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch(error){
            return done(error);
            
        }
    }
));

export default passport;