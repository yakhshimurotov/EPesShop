import { Router } from "express";
 import Product from "../models/Product.js";
 import upload  from "../middleware/multer.js";
 import userMiddleware from "../middleware/user.js";
 const router = Router();
 
 router.get("/", (req, res) => {
     res.render("index", {
         title: "EPes accounts",
         user: req.userId || null,
     });
 });
 
 
 router.get("/product", async (req, res) => {
     const user = req.userId ? req.userId : null;
     const myProduct = await Product.find({user}).lean();
     if(!req.cookies.token) {
         res.redirect("/login");
     };
     
     res.render("product", {
         title: "Product",
         isProduct: true,
         myProduct: myProduct.reverse(),
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
     const { title, description, url, uzs, scores } = req.body;
   
     // ❗️ Ayni xatolik shu yerda bo'lishi mumkin
     const image = req.file?.filename;
   
     if (!title || !description || !url || !uzs || !scores || !image) {
       req.flash("isAddProduct", "All fields are required");
       return res.redirect("/add");
     }
   
     await Product.create({
       title,
       description,
       url,
       uzs,
       scores,
       image,
       user: req.userId,
     });
   
     res.redirect("/accounts");
   });
 
   router.get("/accounts", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const product = await Product.find()
        .populate("user")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    res.render("accounts", {
        title: "Account's",
        isAcounts: true,
        userId: req.userId || null,
        product,
        currentPage: page,
        totalPages,
    });
});

 
 export default router;