const jwt = require('jsonwebtoken');

const checkIfAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    try {
        const decode = jwt.verify(token, 'secret');
        next();
    } catch(error) {
        console.log(error.message);
        res.status(401).json({ error: 'User not authorized' });
    }
}

module.exports = { checkIfAuthenticated }