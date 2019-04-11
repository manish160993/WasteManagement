const Joi = require('joi')

module.exports = {
    makeEntry(req,res,next){
        const schema = {
            date: Joi.date(),
            zipcode: Joi.string().regex(
                new RegExp('^[0-9]{5}$')
            )
        }
        const{error, value} = Joi.validate(req.body,schema)
        if(error){
            switch (error.details[0].context.key){
                case 'date':
                    res.status(400).send({
                        error: "You must select a valid date"
                    })
                    break
                case 'ZipCode':
                    res.status(400).send({
                        error: "You must select a valid ZipCode"
                    })
                    break
                case 'recycle':
                    res.status(400).send({
                        error: "Please enter the valid recycle amount"
                    })
                    break
                case 'waste':
                    res.status(400).send({
                        error: "Please enter the valid waste amount"
                    })
                    break
                default:
                    res.status(400).send({
                        error: "Invalid Entry"
                    })
            }
        }else{
            next()
        }
    }
}