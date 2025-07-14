const express=require('express');
const router=express.Router();
const User=require('../models/user');
const {jwtAuthMiddleware, generateToken}=require('../jwt');

router.post("/signup", async(req,res)=>{
    try {
        const data=req.body;
        const adminUSer = await User.findOne({ role: "admin" });
        if(data.role==='admin' && adminUSer){
        return res.status(400).send({message:"Admin user already exist"});
    }

    if (!/^\d{12}$/.test(data.aadharCardNumber)) {
        return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
    }
    const existingUser=await User.findOne({aadharCardNumber:data.aadharCardNumber});
    if(existingUser){
        return res.status(400).send({message:"User already exist"});
    }

    const user=new User(data);
    const response=await user.save();
    console.log("data is saved");
    const payload={
        id:response.id
    }
    console.log(JSON.stringify(payload));
    const token=generateToken(payload);
    res.status(200).json({response: response, token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
        console.log("Error at signing up");
    }
})

router.post("/login",async(req,res)=>{
    const {aadharCardNumber, password} = req.body;
    try {
        if (!aadharCardNumber || !password) {
            return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
        }
        const user=await User.findOne({aadharCardNumber});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid Aadhar Card Number or Password'});
        }
        const payload={
            id:user.id
        }
        const token=generateToken(payload);
        res.status(200).json({user: user, token: token});
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });   
    }

})

router.get("/profile",jwtAuthMiddleware,async(req,res)=>{
    try {
        const userData=req.user;
        const user=await User.findById(userData.id);
        res.status(200).json({user});
        } catch (error) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put("/profile/password",jwtAuthMiddleware,async(req,res)=>{
    try {
        const { currentPassword, newPassword } = req.body; 
        if(!currentPassword || !newPassword){
          return   res.status(400).json({ error: 'Current Password and New Password are required' });
        }
        const user=await User.findOne({_id:req.user.id});
        if(!user || !(await user.comparePassword(currentPassword))){
            return res.status(401).json({ error: 'Invalid current password' });
        }
        user.password=newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;