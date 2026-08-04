import UsersDAO from "../dao/users.dao.js";

class UsersRepository{

    async getByEmail(email){
        return await UsersDAO.findByEmail(email);
    }

    async create(userData){
        return await UsersDAO.create(userData);
    }
}

export default new UsersRepository();