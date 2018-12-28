var jwt = require("../helpers/jwt.helper");

module.exports = async function(req, res, next){
    let token = req.headers['authorization'];
    // Express headers are auto converted to lowercase
    if(token){
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        let auth = null;
        try {
            auth = await jwt.verify(token);
        } catch (error) {
            return res.send({
                error: {
                    message: 'Invalid token',
                    code: 400
                }
            })
        }
        if(auth){
            req.auth = auth.data;
            req.paramAuth = {
                permission: auth.data.permission,
                code: auth.data.code
            }
            return next();
        } else {
            res.send({
                error: {
                    message: 'Invalid token',
                    code: 400
                }
            })
        }
    }
    else return next();
}