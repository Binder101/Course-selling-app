import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const secret = "Alp89@+&!jfid%hf00%8_$2f";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 255,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 255,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "COURSES" }],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 255,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 255,
  },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "COURSES" }],
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageLink: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  published: {
    type: Boolean,
    require: true,
  },
  author: {
    type: String,
  },
});

const USERS = new mongoose.model("USERS", userSchema);
const ADMINS = new mongoose.model("ADMINS", adminSchema);
const COURSES = new mongoose.model("COURSES", courseSchema);

function authenticateJWT(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(404).json({ message: "Authentication Header not found" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "Authentication token missing" });
  }
  const decode = jwt.verify(token, secret);
  if (decode) {
    req.user = decode.username;
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Inavlid Token - Authentication Failed" });
  }
}

app.post("/admin/signup", async (req, res) => {
  const admin = req.body;
  try {
    const existingAdmin = await ADMINS.findOne({ username: admin.username });
    if (existingAdmin)
      res.status(409).json({
        message: "ADMIN already exists. Try using a different username",
      });
    else {
      const newAdmin = new ADMINS(admin);
      await newAdmin.save();
      const payload = {
        username: admin.username,
        role: "admin",
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1H" });
      res.json({ message: "ADMIN successfully added", token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/admin/signin", async (req, res) => {
  const admin = req.headers;
  try {
    const existingAdmin = await ADMINS.findOne({
      username: admin.username,
      password: admin.password,
    });
    if (!existingAdmin)
      res.status(409).json({
        message: "Incorrect username or password",
      });
    else {
      const payload = {
        username: admin.username,
        role: "admin",
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1H" });
      res.json({ message: "ADMIN successfully logged in", token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/admin/courses", authenticateJWT, async (req, res) => {
  const course = req.body;
  course.author = req.user;
  try {
    const newCourse = new COURSES(course);
    await newCourse.save();
    console.log("Course : ", newCourse);
    const author = await ADMINS.findOne({ username: req.user });
    author.courses.push(newCourse.id);
    await author.save();
    res.json({ message: "Course successfully added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/admin/courses/:id", authenticateJWT, async (req, res) => {
  const id = req.params.id;
  const newCourse = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }
  try {
    const course = await COURSES.findByIdAndUpdate(id, newCourse, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    await course.save();
    res.json({ message: "Course successfully updated" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/admin/courses", authenticateJWT, async (req, res) => {
  try {
    const courses = await COURSES.find({});
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/COURSESAPP").then(() => {
  try {
    app.listen(3000, () => {
      console.log("Server listening at port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to Mongoose Database : ", error);
  }
});

app.post("/user/signup", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await USERS.findOne({ username: user.username });
    if (existingUser)
      res.status(409).json({
        message: "Username already exists. Try using a different username",
      });
    else {
      const newUser = new USERS(user);
      await newUser.save();
      const payload = {
        username: user.username,
        role: "user",
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1H" });
      res.json({ message: "USER successfully added", token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/signin", async (req, res) => {
  const user = req.headers;
  try {
    const existingUser = await USERS.findOne({
      username: user.username,
      password: user.password,
    });
    if (!existingUser)
      res.status(409).json({
        message: "Incorrect username or password",
      });
    else {
      const payload = {
        username: user.username,
        role: "user",
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1H" });
      res.json({ message: "USER successfully logged in", token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/courses", authenticateJWT, async (req, res) => {
  try {
    const courses = await COURSES.find({ published: true });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/purchaseCourse/:id", authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const course = await COURSES.findById({ _id: id });
    if (!course) {
      return res.status(404).json("Course not found");
    }
    const purchasedCourse = course._id;
    const loggedUser = req.user;
    const user = await USERS.findOne({ username: loggedUser });
    user.purchasedCourses.push(purchasedCourse);
    await user.save();
    res.json("Course successfully purchased");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/purchasedCourses", authenticateJWT, async (req, res) => {
  try {
    const user = await USERS.findOne({ username: req.user }).populate(
      "purchasedCourses"
    );
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
