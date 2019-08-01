const email_validator = require('email-validator');
const bcrypt = require('bcrypt');
const {validatePassword} = require('../utils/validator');
const {sendEmail} = require('../utils/mailsUtils');
const {signToken} = require('../utils/jwtUtils');
const User = require('../models/userSchema');

module.exports = {
    signUp: (req, res) => {
        let {email, password} = req.body;

        if (email && email.length && email_validator.validate(email) && password && password.length
            && validatePassword(password)) {
            User.findOne({email: email}, (err, user) => {
                if (!user) {
                    let validationToken = Math.random().toString(36).substr(2, 9);
                    let newUser = new User({
                        accId: Math.random().toString(36).substr(2, 9),
                        email: email,
                        password: password,
                        validationToken: validationToken,
                        validated: 0
                    });
                    newUser.save(err => {
                        if (err) {
                            return res.status(200).json({
                                status: true,
                                type: 'error',
                                message: 'An error occurred while saving user'
                            });
                        } else {
                            sendEmail(email, validationToken);
                            return res.status(200).json({
                                status: true,
                                type: 'success',
                                message: 'User registered ! Check your mail to confirm your account !'
                            });
                        }
                    });
                } else {
                    return res.status(200).json({status: true, type: 'error', message: 'User already exists'});
                }
            })
        } else {
            return res.status(200).json({status: true, type: 'error', message: 'Invalid data provided'});
        }
    },
    signIn: (req, res) => {
        let {email, password} = req.body;

        if (email && email.length && password && password.length) {
            User.findOne({email: email}, (err, user) => {
                if (user) {
                    if (user.validated === true) {
                        bcrypt.compare(password, user.password, async (err, check) => {
                            if (check === true) {
                                return res.status(200).json({type: 'success', token: await signToken(user.accId)})
                            } else {
                                return res.status(200).json({
                                    status: true,
                                    type: 'error',
                                    message: 'Invalid password !'
                                })
                            }
                        });
                    } else {
                        return res.status(200).json({status: true, type: 'error', message: 'Unvalidated account ! Please check your mail'});
                    }
                } else {
                    return res.status(200).json({status: true, type: 'error', message: 'Unknown user'})
                }
            })
        }
    },
    validateAccount: (req, res) => {
        let {token} = req.query;

        if (token && token.length) {
            User.findOne({validationToken: token}, (err, user) => {
                if (user) {
                    if (user.validated === false) {
                        user.validated = true;
                        user.save(err => {
                            if (err) {
                                return res.status(200).json({status: true, type: 'error', message: 'An error occurred'})
                            } else {
                                return res.status(200).json({
                                    status: true,
                                    type: 'success',
                                    message: 'Account successfully validated'
                                })
                            }
                        });
                    } else if (user.validated === true) {
                        return res.status(200).json({status: true, type: 'error', message: 'Account already validated'})
                    }
                } else {
                    return res.status(200).json({status: true, type: 'error', message: 'Invalid information provided'})
                }
            })
        }
    }
};