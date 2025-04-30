import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';

import varMiddleware from "./middleware/var.js";
import userMiddleware from "./middleware/user.js";
import hbsHelper from "./utils/index.js";
import mainRoutes from "./routes/main.js";
import registerRoutes from "./routes/register.js";

dotenv.config();

const app = express(); // ⚠️ BU YERDA BIRINCHI BO‘LISHI KERAK

const hbs = create({ defaultLayout: "main", extname: "hbs", helpers: hbsHelper });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(flash());
app.use(cookieParser());
app.use(varMiddleware);
app.use(userMiddleware);

app.use(mainRoutes);
app.use(registerRoutes);

const appStart = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected...");

    const PORT = process.env.PORT || 3005;
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};


appStart();
