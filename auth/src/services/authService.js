const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require("../config/index");

const authService = {

    async signUp(userData){
        let user = await User.findOne({email: userData.email});
        if(user){
            return {success:false, message: "email address already exists in the system"};
        }
        const hashedPassword = await bcrypt.hash(userData.password,10);
        user = new User({...userData,password:hashedPassword});
        await user.save();
        return {success:true, message: "User registered successfully"};
    },
    async login(email,password){
        const user = await User.findOne({email});
        
        if(!user){
            return {success:false, message: "Invalid email or password"};
        }
        
        const passwordsMatch = await bcrypt.compare(password,user.password);
        
        if(!passwordsMatch){
            return {success:false, message: "Invalid email or password"};
        }
        const token = jwt.sign({email:user.email},jwtSecret);
        return {success:true, data:{token}};
        
    },

    async deleteTestingData(){
        const result = await User.deleteMany({ email: /^test/ });
    }
}

module.exports = authService;