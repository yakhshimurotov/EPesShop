import { Router } from "express";
const router = Router();


// Login --------------

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        isLogin: true,
    });
})

router.post("/login", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

// Login --------------

// SignUp --------------

router.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Sign-up",
        isSignup: true,
    });
})

router.post("/signup", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

// SignUp --------------

export default router