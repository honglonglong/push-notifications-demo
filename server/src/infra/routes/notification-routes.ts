import express, { Request, Response } from "express";
import WebPush from "web-push";
import { INotification } from "../../models/INotification";
import { ISubscription } from "../../models/ISubscription";
import { db } from "../data/respository";

const router = express.Router();

router.get("/push/publickey", async (req: Request, res: Response) => {
    console.log("/notification/push/publickey - called");
    return res.json({ publicKey: process.env.VAPID_PUBLICKEY });
});

router.post("/push/subscribe", async (req: Request, res: Response) => {
    console.log("/notification/push/subscribe - called");
    const body = req.body as ISubscription;
    console.log("New subscriber: " + JSON.stringify(body));
    const result = await db.addSubscription(body);

    return res.json(result);
});

router.get("/push/subscribers", async (req: Request, res: Response) => {
    console.log("/notification/push/subscribers - called");
    const subscribers = await db.listSubscriptions();
    return res.json(subscribers);
});

router.post("/push/send", async (req: Request, res: Response) => {
    console.log("/notification/push/send - called");
    const notificationPayload = req.body as INotification;

    let result: string | undefined;
    const subscriptions = await db.listSubscriptions();
    if (subscriptions && subscriptions.length > 0)
        await Promise.all(
            subscriptions.map(sub =>
                WebPush.sendNotification(sub, JSON.stringify({ notification: notificationPayload }), {
                    vapidDetails: {
                        subject: "https://demo-push-notifications-server.onedaywork.site",
                        publicKey: process.env.VAPID_PUBLICKEY!,
                        privateKey: process.env.VAPID_PRIVATEKEY!
                    }
                })
                    .then(() => console.log("Notification sended to: ", sub._id))
                    .catch(err => console.error("Error sending notification, to sub id: ", sub._id, " reason: ", err))
            ))
            .then(() => result = 'Notifications sended.')
            .catch(err => {
                result = "Error sending notification, reason: ", err;
            });

    return res.json({ message: result });
});

router.delete("/push/subscribers", async (req: Request, res: Response) => {
    console.log("/notification/push/subscribers - delete called");
    const result = await db.deleteAllSubscriptions();
    return res.json({ message: result });
});

export { router as NotificationRouter };
