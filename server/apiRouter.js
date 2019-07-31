const express = require('express');
const todoManager = require('./Routes/todoManagement');
const userManager = require('./Routes/userManagement');

exports.router = (function () {
    const apiRouter = express.Router();

    /* TODO ROUTES */

    apiRouter.route('/addTodo').post(todoManager.addTodo);
    apiRouter.route('/getList').get(todoManager.getList);
    apiRouter.route('/getTodo').get(todoManager.getTodo);
    apiRouter.route('/changeListTitle').post(todoManager.changeListTitle);
    apiRouter.route('/changePriority').post(todoManager.changePriority);
    apiRouter.route('/changeStatus').post(todoManager.changeStatus);
    apiRouter.route('/eraseTodo').post(todoManager.eraseTodo);

    /* USER ROUTES */

    apiRouter.route('/user/sign_up').post(userManager.signUp);
    apiRouter.route('/user/sign_in').post(userManager.signIn);
    apiRouter.route('/user/validate').get(userManager.validateAccount);

    return apiRouter;
})();