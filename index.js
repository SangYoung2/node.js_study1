const express = require('express')
const app = express()
const port = 5000
const {User} = require("./model/user")
const cookieParser = require('cookie-parser')

const config = require('./config/key');

//application/x-www-form-urlencoded 상태의 데이터를 분석해서 가져온다.
app.use(express.urlencoded({extended: true}));
//application/json 상태의 데이터를 분석해서 가져온다.
app.use(express.json());
app.use(cookieParser());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save()
        .then((userinfo) => res.status(200).json({success: true}))
        .catch((err) => {res.json({success: false, err})})
     // save는 mogodb에서 오는 메소드
})

app.post('/api/users/login',(req, res) =>{
    // 요청된 이메일을 데이터베이스 찾기
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.json({
                    loginSuccess: false,
                    messsage: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }
            console.log("이메일 일치")
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) {
                    console.log("비밀번호 일치 실패")
                    return res.json({loginSuccess: false, messsage: "비밀번호가 틀렸습니다."})
                }
                // Password가 일치하다면 토큰 생성
                user.generateToken((err, user)=>{
                    console.log("비밀번호 일치")
                    if(err) return res.status(400).send(err);
                    // 토큰을 저장
                    res.cookie("x_auth", user.token)
                        .status(200)
                        .json({loginSuccess: true, userId: user._id})
                })
            })
        })
        .catch((err)=>{
            console.log(err)
            console.log("에러발생")
            return res.json({
                loginSuccess: false, message: "로그인 실패"
            });
        })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})