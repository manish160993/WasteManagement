const {wastage} = require('../models')
const {communityuser} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const accountSid = 'AC6808ac6908e8361ea7b73b41c0ac0785';
const authToken = '853ee995eaa87c8054b02a2e532d593e';
const client = require('twilio')(accountSid, authToken);
  
async function sendMessage(entry){
    //console.log("Hello twilio" + entry)
    try{
        zipcode = entry.w_zipcode
        let numbers = await communityuser.findAll({
            where :{ 
                c_zipcode : zipcode
            }
        })
        //console.log(numbers[0].dataValues)
        for(val in numbers){
            name = numbers[val].dataValues.communityUser_userName;
            phone = numbers[val].dataValues.communityUser_userMobile;
            console.log(phone)
            client.messages.create({
                from: "+19728460532",
                to: phone,
                body: name+"!!\nYour "+zipcode+" has total trash : "+entry.wastage_trash+"kg and recycled : "+entry.wastage_recycle+" kg"
            }).then((message) => console.log("hello"+message.sid))
        }
    }catch(exp){
        console.log(exp)
    }
}
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
            sendMessage(entry.dataValues);
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
            const {date, zipcode} = (req.query)
            console.log(req.query)
            let entry = await wastage.findAll({
                where: {
                    wastage_date : date,
                    w_zipcode : zipcode
                }
            })
            // for(val in entry){
            //     sendMessage(entry[val].dataValues);
            //     console.log(entry[val].dataValues);
            // }
            res.send(entry)
        }catch(err){
            res.status(400).send({
                error: 'Fetching the data fails',
            })
        }
    }
}
