import express, {Router} from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: Router) => {
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/users/:id", isOwner, deleteUser);
    router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
}       