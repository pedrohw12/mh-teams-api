const express = require('express');

const routes = express.Router();

const TeamController = require('./app/controllers/TeamController');

routes.get('/members', TeamController.index);
routes.post('/members', TeamController.create);
routes.put('/members/:id', TeamController.update);
routes.delete('/members/:id', TeamController.delete);

module.exports = routes;
