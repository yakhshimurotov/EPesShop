import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";

import varMiddleware from "./middleware/var.js";
import userMiddleware from "./middleware/user.js";
import hbsHelper from "./utils/index.js";

// Routers
import mainRoutes from "./routes/main.js";
import registerRoutes from "./routes/register.js";

dotenv.config();
const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs", helpers: hbsHelper});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: "Jokhn", resave: false, saveUninitialized: false}));
app.use(flash());
app.use(cookieParser());
app.use(varMiddleware);
app.use(userMiddleware);

app.use(mainRoutes);
app.use(registerRoutes);

const appStart = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("MongoDB is connected..."))
      .catch(() => console.log("MongoDB is Error"));

    const PORT = process.env.PORT || 3005;
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  };
};

appStart();
