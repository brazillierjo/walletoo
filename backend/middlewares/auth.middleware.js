const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(bearerToken, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.userId = data.userId;
            next();
        });
    } else {
        return res.sendStatus(401);
    }
};
