import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email : {type: String, required: true},
    authontication: {
        password: { type: String, required: true, select: false },
        salt: { type: String,  select: false },
        sesionToken: { type: String, select: false }
    }
})

export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email : string) => UserModel.findOne({ email });

export const getUserBySesionToken = (sessionToken : string) => UserModel.findOne({ 'authontication.sesionToken': sessionToken });

export const getUserById = (id : string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({_id: id});

export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)