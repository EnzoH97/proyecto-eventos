import { Router } from "express";
import passport from "../config/passport.config.js";
import { register, login, logout, current } from "../controllers/sessions.controller.js";
import { githubCallback } from "../controllers/sessions.controller.js";

const router = Router();

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------
router.post("/register", (req, res, next) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: info?.message || "Error al registrar usuario"
            });
        }

        req.user = user;
        register(req, res, next);
    })(req, res, next);
});

// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------
router.post("/login", (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: info?.message || "Error al logear usuario"
            });
        }

        req.user = user;
        login(req, res, next);
    })(req, res, next);
});

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------
router.post("/logout", logout);

// -----------------------------------------------------
// CURRENT
// -----------------------------------------------------

router.get("/current", (req, res, next) => {
    passport.authenticate("current", { session: false }, (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: info?.message || "token invalido o expirado"
            });
        }

        req.user = user;
        return current(req, res, next);
    })(req, res, next);
});
//   GITHUB

router.get("/github", passport.authenticate("github",{
scope: ["user:email"]
}));

router.get("/github/callback",passport.authenticate("github",{
session: false
}),githubCallback);

export default router;