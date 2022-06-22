const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const joi = require('joi');
const database = require('./database');
const bcrypt = require('bcrypt');
const session = require('express-session')




module.exports ={
    login: async function (req,res, next){
        const reqBody = req.body;
        

        const schema = joi.object({
            email: joi.string().required().min(6).max(255).email(),
            password: joi.string().required().min(6),
        });

        const {error} = schema.validate(reqBody);

        if (error){
            console.log(error.details[0].message);
            res.status(401).send('Unauthorized');
            return;
        }

        const sql = 'SELECT * FROM customers WHERE email = ?;';

        try{
            const result = await database.query(sql, [reqBody.email]);
            const rows = result[0];
            customerId = rows[0].id;
            const customerDetails = {
                Name: rows[0].name,
                Email: rows[0].email,
                Type: rows[0].type
            }
            const validPassword = await bcrypt.compare(reqBody.password, rows[0].password_hash);
            if (!validPassword) {throw 'Invalid Password'};
        
        const param = {customerId, customerDetails};
        const token = jwt.sign(param, config.JWT_SECRET, {expiresIn:'72800s'});
        console.log(token);
        
        

        res.cookie('access_token', token, {
            httpOnly:true,
            httpsOnly: true,
            secure:true,
        }).redirect('/customers/home')
        

        
    } catch (err){
        console.log(`Error: ${err}`);
        res.status(401).send('Unauthorized');
        return;
    }
    }
}