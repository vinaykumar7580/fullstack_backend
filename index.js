const express=require("express")
const cors=require("cors")
const connection= require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const {auth}=require("./middleware/auth.middleware")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)

app.use(auth)
app.use("/notes", noteRouter)

app.listen(8080, async()=>{
    try{
        await connection
        console.log("mongodb connected")

    }catch(err){
        console.log(err)
    }
    console.log("server is running on port 8080")
})