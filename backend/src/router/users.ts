import {Router} from "express";
import { deleteUser, getAUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: Router) => {
    router.get("/users", isAuthenticated, getAllUsers);
    router.get("/user", isAuthenticated, getAUser);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
}       