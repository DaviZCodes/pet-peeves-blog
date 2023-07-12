"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserByUsername = exports.getUserById = exports.getUserBySessionToken = exports.getUsers = exports.UserModel = void 0;
//mongoDB db for users
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
const getUsers = () => {
    return exports.UserModel.find();
};
exports.getUsers = getUsers;
const getUserBySessionToken = (sessionToken) => {
    return exports.UserModel.findOne({ "authentication.sessionToken": sessionToken,
    });
};
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const getUserByUsername = (username) => {
    return exports.UserModel.findOne({ username });
};
exports.getUserByUsername = getUserByUsername;
const createUser = (values) => {
    return new exports.UserModel(values).save().then((user) => user.toObject());
};
exports.createUser = createUser;
const deleteUserById = (id) => exports.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => {
    return exports.UserModel.findByIdAndUpdate(id, values);
};
exports.updateUserById = updateUserById;
//# sourceMappingURL=users.js.map