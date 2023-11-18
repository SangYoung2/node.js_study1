const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    var user = this; // 현재 받은 정보가 입력된 user
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
    }
})

const User = mongoose.model('User', userSchema) // 생성된 스키마를 모델로 감싸준다.

module.exports = {User} // 다른 파일에서도 사용할 수 있도록 해준다.