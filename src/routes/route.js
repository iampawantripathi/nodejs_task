const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const userController = require('../controllers/userController.js');

const router = express.Router();



router.get('/users/list', userController.getAllUsers);

router.get('/api/users/:userId', userController.getUserById);

router.post(
    '/user/create',

    celebrate({
        [Segments.BODY]: {
            username: Joi.string().required(),
            age: Joi.number().required(),
            hobbies: Joi.array().required()
        }
    }),
    userController.createUser);

router.put('/update/users/:userId', userController.updateUser);

router.delete('/delete/users/:userId', userController.deleteUser);




module.exports = router;