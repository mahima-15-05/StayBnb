const exporess = require("express");
const Router = exporess.Router();
const { getData } = require("../controllers/admin.controller.js");
const authorize = require('../middlewares/role.middleware.js')
const authMiddleware = require('../middlewares/auth.middleware.js')

Router.get("/admin-dashboard",authMiddleware, authorize("admin"), getData);

module.exports=Router;
