const jwt = require("jsonwebtoken");
const secret = "66d4e67fc1985dbc5624fe94670e6084";

exports.makeToken = async(user)=> {
    const accessToken = await jwt.sign(user, secret, { expiresIn: '1h' });
    return accessToken;
}

