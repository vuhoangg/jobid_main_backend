const axios = require("axios");

function ZaloStrategy(options, verify) {
    if (typeof options == 'function') {
        verify = options;
        options = {};
    }
    if (!verify) {
        throw new TypeError('PassportZalo requires a verify callback');
    }
    if (!options.clientSecret) {
        throw new TypeError('PassportZalo requires a verify clientSecret');
    }
    if (!options.clientID) {
        throw new TypeError('PassportZalo requires a verify clientID');
    }
    if (!options.callbackURL) {
        throw new TypeError('PassportZalo requires a verify callbackUrl');
    }
    this.name = 'zalo';
    this.appSecret = options.clientSecret;
    this.appId = options.clientID;
    this.redirectUri = options.callbackURL;
    this._verify = verify;

}

ZaloStrategy.prototype.authenticate = function (req, options) {
    let self = this; // response
    function done(err, user, info) {
        if (err) {
            return self.error(err);
        }
        if (!user) {
            return self.fail(info);
        }
        self.success(user, info);
    }

    try {
        if (req.query && req.query.error_code && !req.query.error) {
            return self.error(req.query.error_message);
        }
        if (!req.query || (req.query && !req.query.code)) {
            return self.redirect(`https://oauth.zaloapp.com/v3/permission?app_id=${process.env.ZALO_APP_ID}&redirect_uri=${encodeURIComponent(
                `${process.env.API_URL}/auth/zalo/callback`
            )}`);
        } else {
            const urlAccessToken = `https://oauth.zaloapp.com/v3/access_token?app_id=${process.env.ZALO_APP_ID}&app_secret=${process.env.ZALO_APP_KEY}&code=${req.query.code}`;
            axios.get(urlAccessToken).then(r1 => {
                if (r1 && r1.data.access_token) {
                    let socialAPIMe = "https://graph.zalo.me/v2.0/me";
                    axios.get(socialAPIMe, {
                        params: {
                            fields: "id,birthday,name,gender,picture",
                            access_token: r1.data.access_token,
                        }
                    }).then(r2 => {
                        if (r2 && !r2.error) {
                            return self._verify(r1.data.access_token, req.query.code, r2.data, done);
                        } else {
                            return self.error(r2);
                        }
                    });
                } else {
                    return self.error(r1);
                }
            });
        }
    } catch (e) {
        return self.error(e);
    }
};
module.exports = ZaloStrategy;
