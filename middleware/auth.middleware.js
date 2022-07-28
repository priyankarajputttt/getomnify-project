const jwt = require('jsonwebtoken');
const userSchema = require('../model/user.model');

const auth = async (req, res, next) => {
    const token = req.cookies.auth;
    if (token) {
        const decodeToken = jwt.verify(req.cookies.auth, '1234');
        req.email = decodeToken.au;
        try {
            const emailRes = await userSchema.findOne({
                email: decodeToken.au
            });
            if (!emailRes) {
                return res.status(401).send({
                    status: false,
                    message: 'Unauthenticated'
                });
            }
            next();
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message
            });
        }
    }
}

module.exports = {
    auth
}