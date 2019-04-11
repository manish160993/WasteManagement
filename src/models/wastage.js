'use-strict';
module.exports = (sequelize, DataTypes) =>{

    const wastage = sequelize.define('wastage',{
        wastage_id : {
            type:DataTypes.INTEGER,
            unique: true,
            required: true,
            autoIncrement: true,
            primaryKey:true
        },
        wastage_date : {
            type:DataTypes.DATEONLY,
            required: true
        },
        wastage_recycle :  {
            type:DataTypes.DOUBLE,
            required: true
        },
        wastage_trash : {
            type:DataTypes.DOUBLE,
            required: true
        }
    })
    return wastage
}