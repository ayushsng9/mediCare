import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/config.js"
import adminRouter from "./routes/admin.routes.js"
import doctorRouter from "./routes/doctor.routes.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"

// app config

const app = express();
const port = process.env.PORT || 4000
connectDB()

// middlewares

app.use(express.json())
app.use(cors({
  origin: [process.env.CLIENT_URL,process.env.ADMIN_URL], // React dev server
  credentials: true                // allow cookies
}));
app.use(express.static("public")) // to share public assets
app.use(cookieParser())



// api endpoints

app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/doctor',doctorRouter)
app.use('/api/v1/user',userRouter)

app.get('/',(req,res) => {
    res.send('Api working')
})

app.listen(port,() => {
    console.log("Listening on port",port)
})