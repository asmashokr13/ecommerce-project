import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailConfirmation } from "../../middleware/mailConfirmation.js";
import { generateVerificationToken } from "../../utilities/emailTemplate.js";

async function signUp(req, res) {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        let addedUser = await userModel.create(req.body);
        await mailConfirmation(req.body.email);
        const verificationToken = generateVerificationToken(req.body.email);
        addedUser.password = undefined;
        res.status(201).json({
            message: "user registered successfully",addedUser,
            verificationLink: `http://localhost:3000/users/verify/${verificationToken}`});

    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

function verifyAccount(req, res) {
    jwt.verify(req.params.mail, "ourMail", async (err, decoded) => {
        if (err) {
            return res.status(400).json({message: "Invalid verification link"});
        }
        await userModel.findOneAndUpdate(
            {email:decoded.mail },
            {isConfirmed: true }
        );
        res.json({message:"Email verified successfully"
        });
    });

}

async function login(req, res) {
    let foundedUser = await userModel.findOne({email: req.body.email});
    if (!foundedUser) {
        return res.status(404).json({message:"User not found"});
    }
    if (!foundedUser.isConfirmed) {
        return res.status(401).json({message: "Please verify your email first"});
    }
    let matchedPass = bcrypt.compareSync(req.body.password,foundedUser.password
    );
    if (!matchedPass) {
        return res.status(401).json({message: "Email or password incorrect"});
    }
    let token = jwt.sign({_id: foundedUser._id, role: foundedUser.role},"nti");

    res.json({message: "Logged in successfully",token});
}

async function getUsers(req, res) {
    let users = await userModel.find();
    res.json({message: "All users",users});

}
export {signUp,login,verifyAccount,getUsers};