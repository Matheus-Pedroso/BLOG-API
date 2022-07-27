const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRouter = require("./routes/posts")
const categoryRouter = require("./routes/categories")
const multer = require("multer")

dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB")
})

const storage = multer.diskStorage(({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "hello.jpg");
    }
}))

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

//Routes
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRouter)
app.use("/api/categories", categoryRouter)

app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend is running.")
})