import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/product", (req, res) => {
    res.render("product", {
        title: "Product",
        isProduct: true,
    });
});

router.get("/add", (req, res) => {
    res.render("add", {
        title: "Add",
        isAdd: true,
    });
});

export default router;