import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { UserRepository } from "../repository/users.repository.js";
import { AuthService } from "../services/sessions.service.js"

const authService = new AuthService();
const userRepository = new UserRepository();
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("Falta JWT_SECRET en el archivo .env");
}

const cookieExtractor = (req) => {
    if (req?.cookies?.currentUser) {
        return req.cookies.currentUser;
    }
    return null;
};


passport.use("register", new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, _email, _password, done) => {
        try {
            const user = await authService.register(req.body);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.use("login", new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const result = await authService.login(email, password);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }
));

passport.use("current", new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromExtractors([
            cookieExtractor,
            ExtractJwt.fromAuthHeaderAsBearerToken()
        ]),
        secretOrKey: jwtSecret
    },
    async (jwtPayload, done) => {
        try {
            const user = await userRepository.findById(jwtPayload.id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));
export default passport;