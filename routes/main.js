import { Router } from "express";
 import Product from "../models/Product.js";
 import upload  from "../middleware/multer.js";
 import userMiddleware from "../middleware/user.js";
 import User from "../models/user.js"; 
 const router = Router();
 
 router.get("/", (req, res) => {
     res.render("index", {
         title: "ePesAccount",
         user: req.userId || null,
     });
 });
 
 // Profile sahifasi
 router.get("/profile", async (req, res) => {
    const userId = req.userId ? req.userId.toString() : null;
    
    // Productlarni olish
    const myProduct = await Product.find({ user: userId }).populate("user").lean();
    
    // User ma'lumotini olish to‘g‘ridan-to‘g‘ri
    const userData = await User.findById(userId).lean();

    // Agar token yo'q bo'lsa, login sahifasiga yo'naltirish
    if (!req.cookies.token) {
        return res.redirect("/login"); // return qo'shish, keyin kodni to'xtatish
    }

    // Token bor bo'lsa, profile sahifasini ko'rsatish
    res.render("profile", {
        title: "Profile",
        isProfile: true,
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        myProduct: myProduct.reverse(),
    });
});

 // Profile sahifasi
 
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

//  Edit product
router.get("/edit-product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate("user").lean();
    res.render("edit-product", {
        title: "Edit Product",
        product: product,
        isEditProduct: req.flash("isEditProduct"),
    });
});

router.post("/edit-product/:id", userMiddleware, upload.single("image"), async (req, res) => {
    const id = req.params.id;
    const { title, description, url, uzs, scores } = req.body;
    const image = req.file?.filename;
    
    if (!title || !description || !url || !uzs || !scores) {
        req.flash("isEditProduct", "All fields are required");
        return res.redirect("/edit-product/" + id);
    }
    
    await Product.findByIdAndUpdate(id, {...req.body, user: req.userId, image});
    
    res.redirect("/accounts");
});
//  Edit product

//  Delete product
router.get("/delete-product/:id", async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.redirect("/profile");
});
//  Delete product

//  Add product
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
   
     await Product.create({...req.body, user: req.userId, image});
   
     res.redirect("/accounts");
   });
//  Add product
 
//  Accounts
   router.get("/accounts", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
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
//  Accounts
 
 export default router;