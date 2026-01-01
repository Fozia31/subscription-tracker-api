import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middelwares/auth.middlewares.js";

const userRouter = Router();

userRouter.get('/' ,getUsers);

userRouter.get('/:id' , authorize , getUser)

userRouter.post('/' ,(req,res) =>{
    res.send({title: "Create a new user"});
})

userRouter.put('/:id' ,(req,res) =>{
    res.send({title: "Update user by ID"});
})

userRouter.delete('/:id' ,(req,res) =>{
    res.send({title: "Delete user by ID"});
})

export default userRouter