import express from "express";
import { getUserByEmail, createUser } from "db/users";
import { random, authontication } from '../helpers/index.js';

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {userName, email, password} = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = random();
        const user = await createUser({
            userName,
            email,
            password: authontication(salt, password),
        })

        return res.status(200).json(user).end();
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}