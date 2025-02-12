const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/user.routes")

dotenv.config()
connectDB()

const app = express()
// app.use(cors())
app.use(cors({
    origin: 'https://user-crud-r6qj.onrender.com'
  }));
  
app.use(express.json())
app.use("/api/users",userRoutes)

app.get("/",(req,res)=>{
    res.send("API is running")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))