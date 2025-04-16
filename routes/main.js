import { Router } from "express";
import Product from "../models/product.js";
import userMiddleware from "../middleware/user.js";
const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "EPes accounts",
    });
});

router.get("/product", (req, res) => {
    if(!req.cookies.token) {
        res.redirect("/login");
    };

    res.render("product", {
        title: "Product",
        isProduct: true,
    });
});

router.get("/add", (req, res) => {
    if(!req.cookies.token) {
        res.redirect("/login")
        return
    };

    res.render("add", {
        title: "Add",
        isAdd: true,
        isAddProduct: req.flash("isAddProduct"),
    });
});

router.post("/add-product", userMiddleware, async (req, res) => {
    const {description, image, url, uzs} = req.body;

    if(!description || !image || !url || !uzs) {
        req.flash("isAddProduct", "All fields is required");
        res.redirect("/add");
        return
    }

    console.log(req.userId);

    await Product.create({...req.body, user: req.userId});
    res.redirect("/accounts");
    return
});

router.get("/accounts", async (req, res) => {
    const product = await Product.find().lean();
    res.render("accounts", {
        title: "Account's",
        isAcounts: true,
        product: product,
    });

    if(!req.cookies.token){
        res.redirect("/login");
    };

});

export default router;