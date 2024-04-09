import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { ErrorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config()

const app = express()

app.use(cors(({
    origin:process.env.CORS_ORIGIN,
    credentials:true
})))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.get("/",(_,res)=>{
    return res.send("Hello from server")
})

// routes --------------------------------------
import bookRouter from "./routes/book.routes.js";
import chapterRouter from "./routes/chapter.routes.js";

app.use("/api/book",bookRouter)
app.use("/api/chapter",chapterRouter)


app.use(ErrorMiddleware)


export default app;

