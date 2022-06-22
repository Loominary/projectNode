const database = require("./database");
const joi = require("joi");
const bcrypt = require('bcrypt');





module.exports = {
    addNewCustomer: async function (req, res, next){
        const reqBody = req.body;
        
        
        const schema = joi.object({
            name: joi.string().required().min(2).max(155),
            email: joi.string().required().min(3).email(),
            password: joi.string().required().min(6),
            type: joi.string().required().min(1).max(1)
        });
        const { error } = schema.validate(reqBody);

     

        if (error) {
          console.log(error);
          res.send(`error adding customer`);
          return;
        }

      
        const salt = await bcrypt.genSalt(10);
        reqBody.password = await bcrypt.hash(reqBody.password, salt);
        
       

        const sql = "INSERT INTO customers (name, email, password_hash, type)" + " VALUES(?,?,?,?);"

        try{
            const result = await database.query(sql,[
                reqBody.name,
                reqBody.email,
                reqBody.password,
                reqBody.type
               ]);
               console.log(result);
               
               res.json([
                reqBody.name,
                reqBody.email,
                reqBody.type
            ])

        }catch (err){
            if (err.code === 'ER_DUP_ENTRY'){
                res.send('Email is already in use. Please enter another email.')
            } else{
                res.status(400).send('Something went wrong, please try again.')
            }
            console.log(err);
        }
        


       // res.send(`${reqBody.name} added successfully`);
     
       

    
    },

    getCustomerDetails: async function (req, res, next){
        try{
      res.send(req.user.customerDetails)
        } catch (err){
            res.status(400).send('Something went wrong, please try again.')
            console.log(err);
        }
        
    },

    
}