import { UserDAO } from "../dao/user.dao.js";

export class UserRepository {
    constructor() {
        this.dao = new UserDAO();
    }

    findByEmail(email) {
        return this.dao.findByEmail(email);
    }

    findById(id) {
    return this.dao.findById(id);
}

    create(data) {
        return this.dao.create(data);
    }
}