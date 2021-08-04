const speakeasy = require('speakeasy');
const bcrypt = require('bcrypt');
const db = require('../models');

/**
 * Зарегистрировать нового пользователя
 * @param {object} req объект запроса
 * @param {string} req.body.name имя пользователя
 * @param {string} req.body.password пароль пользователя
 * @param {object} res объект ответа
 * @returns {Promise<void>}
 */
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
                secretKey: secretKey.base32,
                password: bcrypt.hashSync(password, 8),
            }, {transaction});

            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).send({message: err.message});
        }
    });
}

/**
 * Верификация пользователя по переданному токену из гугл аутентификации
 * @param {object} req объект запроса
 * @param {string} req.body.userId идентификатор пользователя
 * @param {number} req.body.token гугл аутентификационный номер
 * @param {object} res объект ответа
 * @returns {Promise<boolean>} true - если верификация пройдена, иначе false
 */
const verify = async (req, res) => {
    const {userId, token} = req.body;

    try {
        const user = await db.user.findByPk(userId);
        const verified = speakeasy.totp.verify({
            secret: user.secretKey,
            encoding: 'base32',
            token
        });

        return res.json({verified})
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    signup,
    verify
}
