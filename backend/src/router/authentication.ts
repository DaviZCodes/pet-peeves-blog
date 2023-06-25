import express from "express";

import { login, register, profile} from "../controllers/authentication";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.post("/register", register);
    router.post("/login", login);
    router.get("/profile", isAuthenticated, profile);
}