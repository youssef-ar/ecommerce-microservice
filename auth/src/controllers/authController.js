
const authService = require('../services/authService');
const { validationResult } = require('express-validator');

const authController ={
    async signUp (req,res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors: errors.array()});
            }
            const result = await authService.signUp(req.body);
            if(result.success===false){
                return res.status(409).json(result);
            }
            return res.status(200).json(result);
        }
        catch(err){
            res.status(500).json(err);
        }
        
    },

    async login(req,res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors: errors.array()});
            }
            const result = await authService.login(req.body.email, req.body.password);
            if(result.success===false){
                return res.status(401).json(result);
            }
            return res.status(200).json(result);
            
        }
        catch(err){
            res.status(500).json(err);
        }
    }


}

module.exports = authController;