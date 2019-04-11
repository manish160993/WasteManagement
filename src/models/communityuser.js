'use-strict';
module.exports = (sequelize, DataTypes) =>{

    const communityuser = sequelize.define('communityuser',{
        communityUser_id : {
            type:DataTypes.INTEGER,
            unique: true,
            required: true,
            autoIncrement: true,
            primaryKey:true
        },
        communityUser_userName : {
            type:DataTypes.STRING,
            required: true
        },
        communityUser_userEmail :  {
            type:DataTypes.STRING,
            required: true
        }
    })
    return communityuser
}