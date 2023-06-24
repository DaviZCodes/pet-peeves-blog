import express, {Request, Response} from "express";
import {createUser } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async(req: Request, res: Response) => {
    try {
        const {username, password} = req.body;

        if (!password || !username) {
            return res.sendStatus(400);
        }

        //encrypt the password with random numbers and characters
        const salt = random();
        const user = await createUser({
            username,
            authentication: {
                salt, password: authentication(salt, password),
            },
        })

        //if everything is working fine,
        return res.status(200).json(user).end();
    }

    //if error creating a user
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}