import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
// Routers
import mainRoutes from "./routes/main.js";
import registerRoutes from "./routes/register.js";

dotenv.config();
const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
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
