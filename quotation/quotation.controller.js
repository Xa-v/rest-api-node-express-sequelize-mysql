const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const Service = require('./quotation.service');
const authorize = require('_middleware/authorize')

router.get('/', getAll);
router.get('/:id', getById)

module.exports = router;


function getAll(req, res, next) {
    Service.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    Service.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next)
}

