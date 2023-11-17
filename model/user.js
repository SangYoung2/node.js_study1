const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema) // 생성된 스키마를 모델로 감싸준다.

module.exports = {User} // 다른 파일에서도 사용할 수 있도록 해준다.