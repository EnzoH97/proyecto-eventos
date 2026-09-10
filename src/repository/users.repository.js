import { UserDAO } from "../dao/user.dao.js";

class UserRepository{
    constructor() {
        this.dao = new UserDAO();
    }

    findByEmail(email) {
        return this.dao.findByEmail(email);
    }

    create(data) {
        return this.dao.create(data);
    }
}

export default new UserRepository();