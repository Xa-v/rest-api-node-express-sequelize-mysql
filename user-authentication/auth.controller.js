const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authService = require('./auth.service');


router.post('/', authenticateSchema, login);


module.exports = router;



function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function login(req, res, next) {
    const { username, password } = req.body;
    authService.authenticate({ username, password})
         .then(account => res.json(account))
        .catch(next);
}


















