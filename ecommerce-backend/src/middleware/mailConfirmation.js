import nodemailer from "nodemailer";
import { emailTemplate } from "../utilities/emailTemplate.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "asmashokr3@gmail.com",
        pass: "qdmlplswhkmdyaqt"}
});

export async function mailConfirmation(mail) {
    try {
        const info = await transporter.sendMail({
            from: '"NTIG5" <asmashokr3@gmail.com>',
            to: mail,
            subject: "Confirm Your Email",
            html: emailTemplate(mail)
        });
        console.log("==================================");
        console.log("EMAIL SENT SUCCESSFULLY");
        console.log(info);
        console.log("==================================");
    } catch (err) {
        console.log("==================================");
        console.log("EMAIL ERROR");
        console.log(err);
        console.log("==================================");
    }
}