const database = require("./database");
const joi = require("joi");


module.exports = {
    addBusinessCard: async function (req, res, next){
        const reqBody = req.body;
        
        const schema = joi.object({
            bisName: joi.string().required().min(1).max(250),
            description: joi.string().required().max(300),
            address: joi.string().required().max(200),
            phone: joi.string().required(),

        })

        const {error} = schema.validate(reqBody);

        if (error){
          res.send(`Error in creating card.`)  
          console.log(error);
          return;
        }

        const sql = "INSERT INTO business_cards (customer_id, business_name, description, address, phone)" + " VALUES(?,?,?,?,?);";
        
        try{
            const result = await database.query(sql, [
                req.user.customerId,
                reqBody.bisName,
                reqBody.description,
                reqBody.address,
                reqBody.phone,
            ])

            
            res.status(200).json(
                `card added successfuly. ${
                    [reqBody.bisName, 
                    reqBody.description,
                    reqBody.address,
                    reqBody.phone]}`
                
            )

        } catch (err){
            console.log(err);
        }   
        
        
    },

    getBusinessCardDetails: async function (req, res, next){
        const param = req.query;

        const schema = joi.object({
          cardId: joi.number().required().min(1),
        });

        const {error} = schema.validate(param);

        if(error){
            console.log(error);
            res.status(400).send('Could not find your card.')
            return;
        }

        const sql = `SELECT * FROM business_cards WHERE card_id = ${param.cardId};`;


        try{
            const result = await database.query(sql);

            if(result[0].length>0){

            res.send(result[0])

        } else {res.status(400).send('Card ID does not exist.') }

        }catch (err){
            console.log(err);
            res.status(400).send('Something went wrong, please try again later.')
           
        }
        
    },

    getCardsByCustomerId: async function (req, res, next){
        const param = req.query;

        const schema = joi.object({
            customerId: joi.number().required().min(1),
          });
          
          const {error} = schema.validate(param);

          if(error){
              console.log(error);
              res.status(400).send('Could not find any cards.')
              return;
          }

          const sql = `SELECT * FROM business_cards WHERE customer_id = ${param.customerId};`;
          try{
            const result = await database.query(sql);

            if(result[0].length>0){

            res.send(result[0])

        } else {res.status(400).send('Could not find any cards') }

        }catch (err){
            console.log(err);
            res.status(400).send('Something went wrong, please try again later.')
           
        }
    },
   
    updateBusinessCard: async function (req, res, next){
        const reqBody = req.body;
        console.log('The request: ', reqBody);

        const schema = joi.object({
            business_name: joi.string().min(2).max(100),
            description: joi.string().min(2).max(300),
            address: joi.string().max(200),
            phone: joi.string(),
        }).min(1);

        const { error, value } = schema.validate(reqBody);
        

        if (error) {
            console.log(value);
            res.status(400).send(`Error updating card: ${error}`);
            return;
        }
       

        const keys = Object.keys(value);   
        const values = Object.values(value); 
        const fields = keys.map(key => `${key}=?`).join(',');
        
        
        values.push(req.params.id);
        

        const sql = `UPDATE business_cards SET ${fields} WHERE card_id=?`;

        try {
            const result = await database.query(sql, values);
            console.log(values);
            res.json(value);
        }
        catch (err) {
            console.log(err);
            return;
        }

        

    },

    deleteBusinessCard: async function (req, res, next){
       // const param = req.query;
        console.log('Here is delete controller');
        const schema = joi.object({
            id: joi.number().required(),
        })

        

        const {error, value} = schema.validate(req.params);

       
        console.log(value);

        if (error) {
            res.status(400).send('Error with deleting your card');
            console.log(error.details[0].message);
            return;
        }

        const sql = `DELETE FROM business_cards WHERE card_id=?`;

      

        try {
            const result = await database.query(sql, [value.id]);
            console.log(value.id);
            console.log('Card was successfuly deleted');
            
        }
        catch (err) {
            res.status(400).send('Could not delete your card');
            console.log(err);
        }

    },

    
}