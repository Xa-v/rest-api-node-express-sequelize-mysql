const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');
const authorize = require('_middleware/authorize')

router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', getById)
router.post('/', createSchema, create)
router.put('/:id', updateSchema, update)
router.delete('/:id', _delete);

module.exports = router;


function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next)
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({message: 'User created                                                     '}))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated                                                '}))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({message: 'User deleted                                                  '}))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object( {
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
