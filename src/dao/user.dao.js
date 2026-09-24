import User from "../models/user.model.js";

export class UserDAO {
    async findByEmail(email) {
        return User.findOne({ email });
    }

    async findById(id) {
    return User.findById(id).select("-password");
}

    async create(data) {
        return User.create(data);
    } 
}