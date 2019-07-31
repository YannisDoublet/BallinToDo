const jwt = require('jsonwebtoken');
const {secret} = require('../config/jwt_info');

module.exports = {
    signToken: (id) => {
        return jwt.sign({token: id}, secret);
    },
    decodeToken: (token) => {
        return jwt.decode(token, secret);
    }
};