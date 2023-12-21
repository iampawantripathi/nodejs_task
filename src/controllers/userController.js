const { v4: uuidv4 } = require('uuid');


const { RES, REE } = require('../services/service.js');
const User = require('../models/mongodb/User.model.js');

class UserController {

    constructor() {
        this.getUserById = this.getUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    /* Function Name: getAllUsers
       Description: Api For get all users
    */

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            return RES(res, users, 200);
        } catch (error) {
            console.error(error);
            return REE(res, error.message, 500);
        }
    }

    /* Function Name: getUserById
       Description: Api For get user by id
    */

    async getUserById(req, res) {
        const userId = req.params.userId;


        // Validate if userId is a valid UUID
        if (!this.isValidUUID(userId)) {
            return REE(res, 'Invalid userId', 400);
        }

        try {
            const user = await User.findById(userId);

            if (!user) {
                return REE(res, 'User not found', 404)
            }

            RES(res, user, 200);
        } catch (error) {
            return REE(res, error.message, 500);
        }
    };

    /* Function Name: createUser
       Description: Api For create user
    */

    async createUser(req, res) {
        try {
            const { username, age, hobbies } = req.body;

            const newUser = {
                _id: uuidv4(),
                username,
                age,
                hobbies: hobbies || [],
            };

            const result = await User.create(newUser);

            return RES(res, result, 201);
        } catch (error) {
            console.error(error);
            return REE(res, error.message, 500);
        }
    }

    /* Function Name: updateUser
      Description: Api For update user
   */

    async updateUser(req, res) {
        try {
            const userId = req.params.userId;

            // Validate if userId is a valid UUID
            if (!this.isValidUUID(userId)) {
                return REE(res, 'Invalid userId', 400);
            }

            const { username, age, hobbies } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, age, hobbies },
                { new: true }
            );

            if (!updatedUser) {
                return REE(res, 'User not found', 404);
            }

            return RES(res, updatedUser, 200);
        } catch (error) {
            console.error(error);
            return REE(res, error.message, 500);
        }
    }

    /* Function Name: deleteUser
     Description: Api For delete user
  */

    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;

            // Validate if userId is a valid UUID
            if (!this.isValidUUID(userId)) {
                return REE(res, 'Invalid userId', 400);
            }

            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return REE(res, 'User not found', 404);
            }

            return RES(res, 'Data is deleted', 204);
        } catch (error) {
            console.error(error);
            return REE(res, error.message, 500);
        }
    }

    /* Function Name: isValidUUID
     Description: Api For is valid uuid
  */

    isValidUUID(uuid) {
        const uuidRegex = /^[a-fA-F0-9]{24}$/;
        return uuidRegex.test(uuid);
    }

}

module.exports = new UserController();
