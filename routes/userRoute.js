const express=require('express');
const router=express.Router();
const User=require('../models/user');
const {jwtAuthMiddleware, generateToken}=require('../jwt');

router.post("/signup", async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        // Check for required fields
        const requiredFields = ['fullName','aadharNumber', 'password', 'age','address' ,'role'];
        for (let field of requiredFields) {
            if (!data[field])
                return res.status(400).json({ error: `${field} is required` });
        }

        // Aadhar number validation (should be 12 digit string)
        if (!/^\d{12}$/.test(data.aadharNumber)) {
            return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
        }

        // Prevent more than one admin
        if (data.role === 'admin') {
            const adminUser = await User.findOne({ role: "admin" });
            if (adminUser)
                return res.status(400).json({ error: "Admin user already exists" });
        }

        // Uniqueness check
        const existing = await User.findOne({ aadharNumber: data.aadharNumber });
        if (existing) {
            return res.status(400).json({ error: "User with this Aadhar already exists" });
        }

        // Save user
        const user = new User({
            fullName: data.fullName,
            aadharNumber: data.aadharNumber,
            password: data.password,
            age: data.age,
            address: data.address,
            role: data.role
        });

        const response = await user.save();
        const payload = { id: response.id };
        const token = generateToken(payload);
        res.status(201).json({ user: response, token: token });
    } catch (error) {
        // MongoDB/Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/login",async(req,res)=>{
    const {aadharNumber, password} = req.body;
 
    try {
        if (!aadharNumber || !password) {
            return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
        }
        const user=await User.findOne({aadharNumber});
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

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
      const userData = req.user;
      const user = await User.findById(userData.id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        user: {
          fullName: user.fullName,
          address: user.address,
          aadharNumber: user.aadharNumber,
          age: user.age,
          role: user.role
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
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
