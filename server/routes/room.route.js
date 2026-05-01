const express = require('express');
const roomController = require('../controllers/room.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const authorize = require('../middlewares/role.middleware.js');

const Router = express.Router();


//admin routes
Router.post('/', authMiddleware, authorize("admin"), roomController.createRoom);
Router.post('/:id', authMiddleware, authorize("admin"), roomController.updateRoom);


//public routes
Router.get('/',  roomController.getRooms);

module.exports = Router;