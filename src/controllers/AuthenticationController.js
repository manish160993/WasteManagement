const {wastage} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user){
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user,config.authentication.jwtSecret,{
        expiresIn: ONE_WEEK
    })
}
module.exports = {
    async makeEntry(req,res){
        try{
            const {date, zipcode, recycle, waste} = (req.body)
            console.log(req.body)
            let entry = await wastage.create({
                w_zipcode : zipcode,
                wastage_date : date,
                wastage_recycle : recycle,
                wastage_trash : waste
            })
            res.send(entry)
            
        }
        catch(err){
            res.status(400).send({
                error: 'This fail',
            })
        }
    },

    async getDetails(req, res){
        try{
            const {date} = (req.query)
            console.log(req.query)
            let entry = await wastage.findAll({
                where: {
                    wastage_date : date,
                    //w_zipcode : zipcode
                }
               
            })
            res.send(entry)
        }catch(err){
            res.status(400).send({
                error: 'Fetching the data fails',
            })
        }
    }
}
