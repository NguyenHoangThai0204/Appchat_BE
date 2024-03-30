const express = require('express');
const routes = express.Router();
const userContronller = require('../contronllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

//[POST] http://localhost:3001/api/user/signup
routes.post('/signup', userContronller.createUser);

//[POST] http://localhost:3001/api/user/login
routes.post('/login', userContronller.loginUser);

//[POST] http://localhost:3001/api/user/logout
routes.post('/logout', userContronller.logoutUser);

//[PUT] http://localhost:3001/api/user/updateUser/:id
routes.put('/updateUser/:id', authUserMiddleware, userContronller.updateUser);

//[DELETE] http://localhost:3001/api/user/deleteUser/:id
routes.delete('/deleteUser/:id', authMiddleware, userContronller.deleteUser);

//[GET] http://localhost:3001/api/user/getAllUser
routes.get('/getAllUser', authMiddleware, userContronller.getAllUser);

//[GET] http://localhost:3001/api/user/getDetailsUser/:id
routes.get('/getDetails/:id', authUserMiddleware, userContronller.getDetailsUser);

//localhost:3001/api/user/refreshToken
routes.post('/refreshToken', userContronller.refreshToken);

module.exports = routes;
