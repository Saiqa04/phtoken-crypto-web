var requestIp = require('request-ip');

const GetClientIP = (req) => {
    var clientIp = requestIp.getClientIp(req);
    return clientIp;
}

module.exports = GetClientIP;