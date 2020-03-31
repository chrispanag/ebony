import { RequestHandler, Request, Response } from 'express';
import { MessengerWebhookBody, MessagingEntry } from './interfaces/webhook';

interface MessengerWebhooks {
    messaging?: (e: MessagingEntry) => void;
    standby?: (param: any) => void;
    changes?: (param: any) => void;
}

export default function webhook(page_id: string, { messaging, standby, changes }: MessengerWebhooks = {}): RequestHandler {
    return (req: Request, res: Response) => {
        res.sendStatus(200);
        const data = req.body as MessengerWebhookBody;
        if (data.object === 'page') {
            data.entry.forEach(e => {
                // Main messaging webhook
                if (e.messaging) {
                    if (messaging) {
                        e.messaging.forEach(e => messaging(e));
                    } else {
                        console.log(`No messaging webhook to process: `);
                        console.log(e);
                    }
                    return;
                }
                // Standby Channel (Handover Protocol)
                if (e.standby) {
                    if (standby) {
                        standby(e);
                    } else {
                        console.log(`No standby webhook to process:`);
                        console.log(e);
                    }
                    return;
                }
                // Comment-to-Messenger
                if (e.changes) {
                    if (changes) {
                        changes(e);
                    } else {
                        console.log(`No changes webhook to process: `);
                        console.log(e);
                    }
                    return;
                }
            });
        } else {
            console.log("Webhook message not from FB Page");
        }
    }
}