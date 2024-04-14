import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const paymentSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.number()
});

// webhookUrl is where app will send a notification upon successful payment
app.post("/hdfcWebhook", (req, res) => {
    console.log("hdfc webhook received", req.body);
    try {
        const paymentInformation = paymentSchema.parse(req.body);
        console.log("paymentInformation", paymentInformation);
    } catch (e) {
        console.error("Error parsing payment information", e);
        res.status(400).send("Invalid request");
    }

})