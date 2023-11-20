const {User} = require("../model/user")
let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth; //x_auth라는 쿠키를 가져온다.
    // 토큰을 복호화 하여 db에서 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})
        console.log(user._id)
        console.log(err)
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth};