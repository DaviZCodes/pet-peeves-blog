import express, {Request, Response} from "express";
import { deleteUserById, getUsers, getUserById, getUserBySessionToken } from "../db/users";

export const getAllUsers = async(req: Request, res: Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();   
    }

    catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const getAUser = async (req: Request, res: Response) => {
    try {
      const sessionToken = req.cookies["PETLOGGER-AUTH"]; 
  
      const user = await getUserBySessionToken(sessionToken);
  
      if (user) {
        return res.status(200).json(user).end();
      } 
      
      else {
        return res.sendStatus(404); 
      }

    } 
    catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  };

export const deleteUser = async(req: Request, res: Response) => {
    try{
        const {id} = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    }

    catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}


export const updateUser = async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {username} = req.body;

        if (!username) {
            res.sendStatus(400);
        }

        const user = await getUserById(id);
        user!.username = username;

        await user!.save();

        return res.status(200).json(user).end();
    }

    catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}