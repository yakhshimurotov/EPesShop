import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../servies/servies.js";
const router = Router();


// Login --------------

router.get("/login", (req, res) => {
    if(req.cookies.token) {
        res.redirect("/")
        return
    }
    res.render("login", {
        title: "Login",
        isLogin: true,
        isLoginError: req.flash("isLoginError"),
    });
});


router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        req.flash("isLoginError", "All fields is required");
        res.redirect("/login");
    };

    const existUser = await User.findOne({email});
    if(!existUser) {
        req.flash("isLoginError", "User not found");
        res.redirect("/login");
        return;
    };
    
    const isPassword = await bcrypt.compare(req.body.password, existUser.password);
    if(!isPassword) {
        req.flash("isLoginError", "Password is wrong");
        res.redirect("/login");
        return
    };

    const token = generateJwtToken(existUser._id);
    res.cookie("token", token, {httpOnly: true, secure: true});
    res.redirect("/accounts");
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

// Login --------------

// SignUp --------------

router.get("/signup", (req, res) => {
    if(req.cookies.token) {
        res.redirect("/")
        return
    }
    res.render("signup", {
        title: "Sign-up",
        isSignup: true,
        isSignupError: req.flash("isSignupError"),
    });
})

router.post("/signup", async (req, res) => {

    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password){
        req.flash("isSignupError", "All fields is required");
        res.redirect("/signup");
    };

    const userEmail = await User.findOne({email});
    if(userEmail){
        req.flash("isSignupError", "Email is already use");
        res.redirect("/signup");
        return;
    };

    const userName = await User.findOne({firstName});
    if(userName){
        req.flash("isSignupError", "First Name is already use");
        res.redirect("/signup");
        return
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
    };
    const user = await User.create(userData);
    const token = generateJwtToken(user._id);
    res.cookie("token", token, {httpOnly: true, secure: true});
    res.redirect("/accounts");
    return
});

// SignUp --------------

export default router