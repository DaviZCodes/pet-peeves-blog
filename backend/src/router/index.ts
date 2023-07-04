import {Router} from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";

const router = Router();

export default (): Router => {
    authentication(router);
    users(router);
    posts(router);

    return router;
}