const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../model/user.model")
const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {email,password,location,age}=req.body;
    
    try{
        bcrypt.hash(password,5,async(err, hash)=> {
            // Store hash in your password DB.
            const user=new UserModel({email,password:hash,location,age})
            await user.save()
            res.status(200).send({"msg":"register successful!"})
        });

    }catch(err){
        res.status(400).send({"msg":"register failed!"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        let user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    res.status(200).send({msg:"user login successfully",token:jwt.sign({userID:user._id}, 'masai')})
                }else{
                    res.status(400).send({msg:"user login failed"})
                }
            });
        }else{
            res.status(400).send({msg:"user not found"})
        }

    }catch(err){
        res.status(400).send(err)
    }
})

module.exports={userRouter}
