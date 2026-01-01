import { Router}  from "express";
import authorize from "../middelwares/auth.middlewares.js";
import { createSubcription, getUserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) =>{
    res.send({title: "Get all subscriptions"});
})

subscriptionRouter.get('/:id', (req,res) =>{
    res.send({title: "Get subscriptions details"});
})

subscriptionRouter.post('/',authorize,createSubcription)

subscriptionRouter.put('/:id', (req,res) =>{
    res.send({title: "Update a subscription"});
})
subscriptionRouter.get('/user/:id', authorize, getUserSubscription)

subscriptionRouter.delete('/:id', (req,res) =>{
    res.send({title: "Delete a subscription"});
})
subscriptionRouter.put('/:id/cancel', (req,res) =>{
    res.send({title: "Cancel a subscription"});
})
subscriptionRouter.get('/upcoming-renewals', (req,res) =>{
    res.send({title: "Get upcoming renewals"});
})

export default subscriptionRouter;