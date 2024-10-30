import User from "../models/user.model.js";
import bcrypt from "bcrypt";  
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
    try {
        const hashedPwd = bcrypt.hashSync(req.body.password, 4)
        const newUser = new User({
            ...req.body,
            password:hashedPwd,
        })
        await newUser.save();
        return res.status(201).send("User has been created.")
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user) {
            return next(createError(404, "User not found!"))
        }

        const isCorrect = bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) {
            return next(createError(400, "Usernmae or Password is wrong!"));
        }

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller,
        }, process.env.JWT_KEY)

        const {password, ...info} = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(info);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            samesite: "none",
            secure: true,
        }).status(200).send("User looged out!")
    } catch (error) {
        next(error)
    }
}