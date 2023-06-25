import express, {Request, Response} from "express";
import {createUser, getUserByUsername, getUserBySessionToken} from "../db/users";
import { authentication, random } from "../helpers";

export const login = async(req: Request, res: Response) => {
    try {
        const {username, password} = req.body;

        if (!password || !username) {
            return res.sendStatus(400);
        }

        const user = await getUserByUsername(username).select("+authentication.salt +authentication.password");
        
        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication!.salt!, password);

        if (user.authentication!.password !== expectedHash){
            console.error("Wrong password");
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication!.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie("PETLOGGER-AUTH", user.authentication!.sessionToken, {domain: "localhost", path: "/"})
        return res.status(200).json(user).end();

    }

    //if error creating a user
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

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

export const profile = async (req: express.Request, res: express.Response) => {
    try {
      const sessionToken = req.cookies["PETLOGGER-AUTH"];
  
      if (!sessionToken) {
        return res.sendStatus(401); // Unauthorized
      }
  
      const user = await getUserBySessionToken(sessionToken);
  
      if (!user) {
        return res.sendStatus(404); // Not Found
      }
  
      return res.status(200).json(user.username);

    } 
    
    catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
  };