import { Router } from "express";
import passport from "../config/passport.config.js";
import { register, login, logout, current } from "../controllers/sessions.controller.js";
import { githubCallback } from "../controllers/sessions.controller.js";

const router = Router();

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------

router.post("/register", passport.authenticate("register", {
    session: false
}),register
);

// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------

router.post("/login", passport.authenticate("login", {
    session: false
}),login
);

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------
router.post("/logout", logout);

// -----------------------------------------------------
// CURRENT
// -----------------------------------------------------

router.get("/current", passport.authenticate("current",{
    session: false
}),current
);

//   GITHUB

router.get("/github", passport.authenticate("github",{
scope: ["user:email"]
}));

router.get("/github/callback",passport.authenticate("github",{
session: false
}),githubCallback);

export default router;