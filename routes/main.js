import { Router } from "express";
import Product from "../models/Product.js";
import upload  from "../middleware/multer.js";
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

router.post("/add-product", userMiddleware, upload.single("image"), async (req, res) => {
    if(req.file) {
        console.log("Fayllar yuklandi", req.file.filename);
    }else {
        console.log("Fayllar yuklanmadi chunki form ga hecnima kiritilmagan");
    }; // 👉 bunda fayl haqida ma’lumot chiqishi kerak
    const { description, url, uzs } = req.body;
  
    // ❗️ Ayni xatolik shu yerda bo'lishi mumkin
    const image = req.file?.filename;
  
    if (!description || !url || !uzs || !image) {
      req.flash("isAddProduct", "All fields are required");
      return res.redirect("/add");
    }
  
    await Product.create({
      description,
      url,
      uzs,
      image,
      user: req.userId,
    });
  
    res.redirect("/accounts");
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