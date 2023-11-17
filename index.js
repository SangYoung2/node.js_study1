const express = require('express')
const app = express()
const port = 5000
const {User} = require("./model/user")

//application/x-www-form-urlencoded 상태의 데이터를 분석해서 가져온다.
app.use(express.urlencoded({extended: true}));
//application/json 상태의 데이터를 분석해서 가져온다.
app.use(express.json());


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tmskan8:rlatkddud8@boilerplate.sdn0sa9.mongodb.net/?retryWrites=true&w=majority')
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})