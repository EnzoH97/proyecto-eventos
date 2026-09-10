import User from "../models/user.model.js";

class UsersDAO{
    async findByEmail(email) {
        return User.findOne({ email });
    }

    async create(data) {
        return User.create(data);
    }
}

export default new UsersDAO();