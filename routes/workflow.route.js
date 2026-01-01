import Router from "express";
import { sendReminderWorkflow } from "../controllers/workflow.controller";

const workflowRouter = Router();

workflowRouter.post('/subscription/reminder',sendReminderWorkflow);

export default workflowRouter;