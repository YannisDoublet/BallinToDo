const express = require('express');
const todoManager = require('./Routes/todoManager');

exports.router = (function () {
    const apiRouter = express.Router();

    apiRouter.route('/addTodo').post(todoManager.addTodo);
    apiRouter.route('/getTodo').get(todoManager.getTodo);
    apiRouter.route('/changePriority').post(todoManager.changePriority);
    apiRouter.route('/changeStatus').post(todoManager.changeStatus);
    apiRouter.route('/eraseTodo').post(todoManager.eraseTodo);

    return apiRouter;
})();