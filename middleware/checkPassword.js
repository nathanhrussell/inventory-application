require("dotenv").config();

function checkMasterPassword(req, res, next) {
    const { masterPassword }  = req.body;

    if (masterPassword !== process.env.MASTER_PASSWORD) {
        return res.status(403).send("Forbidden: incorrect master password.");
    }

    next();
}

module.exports = checkMasterPassword;