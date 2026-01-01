    import { serve } from '@upstash/qstash/workflow/expressjs';
    import Subscription from '../models/subscription.model.js';
    import dayjs from 'dayjs';

    const REMINDERS = [7,5 , 3,1];

    export const sendReminderWorkflow = serve(async (context) => {
        const {subscriptionId} = context.requestPayload;

        const subscription = await fetchSubscription(context, subscriptionId);

        if(!subscription || subscription.status !== 'active' ) return ;

        const renewalDate = dayjs(subscription.renewalDate);

        if(renewalDate.isBefore(dayjs())){
            console.log(`Renewal date has passed for subscription ${subscriptionId}, marking as expired.`);
            return
        }
        for(const daysBefore of REMINDERS){
            const reminderDate = renewalDate.subtract(daysBefore, 'day');

            if(reminderDate.isAfter(dayjs())){
                await sleepUnitReminder(context, `${daysBefore}-day-reminder`, reminderDate);
            }
            await triggerReminder(context, `${daysBefore}-day-reminder`, subscription);
        }

    });

    const fetchSubscription = async (context, subscriptionId) => {
        return await context.run('get subscription',async () =>{
            return Subscription.findById(subscriptionId);
        })
    };
    const sleepUnitReminder = async (context ,label , date ) =>{
        console.log(`sleeping until ${label} reminder date: ${date}`);
        await context.sleepUntil(label , date.toDate());
    }

    const triggerReminder = async (context , label , subscription) =>{
        return await context.run(label , async() =>{
            console.log(`Triggering ${label} reminder`);

            await sendReminderWorkflow({to , type , subscription}{
                to:subscription.user.email,
                type:label,
                subscription,
            }) 
        })
    }