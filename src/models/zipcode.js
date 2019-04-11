'use-strict';
module.exports = (sequelize, DataTypes) =>{

    const zipcode = sequelize.define('zipcode',{
        zipcode : {
            type:DataTypes.STRING,
            unique: true,
            required: true,
            primaryKey:true,
        }
    })
    return zipcode
}