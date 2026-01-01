import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubcription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id,
        });
        await workflowClient.trigger({
            url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body:{
                subscriptionId:subscription._id,
            },
            headers:{
                'Content-Type':'application/json'
            },
            retries:0,
        })


        res.status(201).json({success:true, data:subscription});
    }catch(error){
        next(error);
    }
}

export const getUserSubscription = async (req , res ,next) => {
    try{
        if(req.user.id !== req.param.id ) {
            const error = new Error("You are not the owner of this account");
            error.status = 401;
            throw Error;
        }

        const subscription = await  Subscription.find({user:req.param.id});

        res.status(200).json({
            success:true,
            data:subscription
        })
    }catch(error){
        next(error)
    }
}