const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
module.exports = (app) =>{
    app.post('/addEntry',
    //AuthenticationControllerPolicy.makeEntry,
    AuthenticationController.makeEntry),
    app.get('/getDetails',
    AuthenticationController.getDetails)   
}