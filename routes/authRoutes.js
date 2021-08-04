const authController = require('../controllers/authController');

module.exports = app => {
    app.post('/api/register', authController.signup);
    app.post('/api/verify', authController.verify)
}
