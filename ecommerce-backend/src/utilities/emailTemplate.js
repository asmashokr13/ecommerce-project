import jwt from "jsonwebtoken";

export function generateVerificationToken(mail) {
    return jwt.sign({ mail }, "ourMail");
}

export const emailTemplate = (mail) => {
    const hashedMail = generateVerificationToken(mail);

    return `
        <h2>Welcome</h2>
        <a href="http://localhost:3000/users/verify/${hashedMail}">
            Confirm Email
        </a>
    `;
};