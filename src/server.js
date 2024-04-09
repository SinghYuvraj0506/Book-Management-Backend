import app from "./app.js";
import connectToDB from "./db.js";

const port = process.env.PORT || 8000

connectToDB()
.then((e)=>{
    app.listen(port, () => {
      console.log("Server running at port", port);
    });

    app.on("error",()=>{
        console.log("Error occured in running the express server")
    })
})
.catch((error)=>{
    console.log("Database connection failed",error)
})

