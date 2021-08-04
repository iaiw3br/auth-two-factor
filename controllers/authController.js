const speakeasy = require('speakeasy');
const bcrypt = require('bcrypt');
const db = require('../models');

const signup = async (req, res) => {
    const {name, password} = req.body;
    await db.sequelize.transaction(async transaction => {
        try {
            const secretKey = speakeasy.generateSecret();
            const foundUser = await db.user.findOne({
                where: {name}
            }, transaction);

            if (foundUser) {
                res.status(400).send({message: 'Пользователь с таким именем уже зарегистрирован'})
            }

            const newUser = await db.user.create({
                name,
                secretKey,
                password: bcrypt.hashSync(password, 8),
            }, {transaction});

            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).send({message: err.message});
        }
    });
}

module.exports = {
    signup
}
