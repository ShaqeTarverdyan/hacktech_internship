const { body } = require('express-validator');


module.exports = () => 
    [
        body('email', 'Please enter a valid email')
            .trim()
            .notEmpty()
            .isEmail()
            .normalizeEmail(),
        body('password', 'The password must be at least 6 chars long')
            .trim()
            .isLength({ min: 6 })
            .notEmpty()
    ]
