const path = require('path');
const bcrypt = require('bcrypt');




module.exports ={
    getHtmlFilePath: function (htmlFileName){
        return path.join(__dirname, '../client', htmlFileName);
    },

    getLinkRoute: function(){
        
    },
}