const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true, // spaceBar의 공백을 제거
        unique: 1
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next){ // save를 실행하기 전에 거쳐가게 만듬
    // 비밀번호를 암호화 시킨다.
    let user = this; // 현재 받은 정보가 입력된 user
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function (err, salt){ // salt는 암호화 하는 작업
            if(err) return next(err)
            // 비밀번호의 데이터 값을 변환
            bcrypt.hash(user.password, salt, function (err, hash) { // hash는 암호화된 비밀번호
                if(err) return next(err)
                // 암호화 된 비밀번호가 생성되었다면 user의 password값을 hash값으로 바꿔준다.
                user.password = hash;
                next();
            })
        })
    }else {
        next();
    }
})

userSchema.methods.generateToken = function (cb) {
    let user = this;

    //jsonwebtoken을 이용해서 token을 생성하기
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token -> 'secretToken' -> user._id
    user.token = token;
    user.save().then(() => {
        return cb(null, user)
    }).catch((err) => {
        return cb(err)
    })
}

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword 와 암호화된 비밀번호를 비교하여 같은 것인지 확인
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        console.log(this.password)
        if(err) {return cb(err);}
        else{
            cb(null, isMatch);
        }
    })
}

userSchema.statics.findByToken = function (token, cb) {
    let user = this;

    // 토큰을 decode(복호화)한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token})
            .then(data => {
                cb(null, data)
            }).catch(err => {
                console.log("실패")
            })


    })
}

const User = mongoose.model('User', userSchema) // 생성된 스키마를 모델로 감싸준다.

module.exports = {User} // 다른 파일에서도 사용할 수 있도록 해준다.