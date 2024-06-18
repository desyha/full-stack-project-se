import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js"
import bengkelRoute from "./routes/bengkel.route.js"
import userRoute from "./routes/user.route.js"
// import postRoute from "./routes/post.route.js"
const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/bengkel", bengkelRoute)
app.use("/api/users", userRoute);

app.listen(3500, () => {
    console.log("server running")
})