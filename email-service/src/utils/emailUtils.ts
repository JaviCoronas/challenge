import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

import Subscription from "../models/Subscription";


export function sendSubscriptionEmail(sub: Subscription) {
    const mailer = getMailer();
    const mailOptions = {
        from: '"Adidas Team "',
        to: sub.email,
        subject: `Adidas Newsletter`,
        text: 'Thank you!!!' + sub.firstName + ". You are subscribed to Adidas Newsletter",
    };
    mailer.sendMail(mailOptions, (error, info: SMTPTransport.SentMessageInfo) => {
        if (error) console.log(error)
        console.log("success")
    });
}

function getMailer() {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
}