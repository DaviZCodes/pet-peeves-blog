import mongoose, {Schema, model} from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    }
})

export const UserModel = model("User", UserSchema);

export const getUsers = () => {
    return UserModel.find();
}

export const getUserBySessionToken = (sessionToken: string) => {
    return UserModel.findOne({"authentication.sessionToken": sessionToken,
})};

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => {
    return new UserModel(values).save().then((user)=> user.toObject());
}

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});

export const updateUserById = (id: string, values: Record<string, any>) => {
    return UserModel.findByIdAndUpdate(id, values);
}