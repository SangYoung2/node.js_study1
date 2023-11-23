import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../../_action/user_action";
import Auth from "../../../hoc/auth";
import {useNavigate} from "react-router-dom";

function RegisterPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State (데이터를 저장하는 곳)
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    // Email 과 Password를 입력 후 각각에 저장
    const onEmailHandler = e => {
        setEmail(e.currentTarget.value)
    }

    const onNameHandler = e => {
        setName(e.currentTarget.value)
    }

    const onPasswordHandler = e => {
        setPassword(e.currentTarget.value)
    }

    const onConfirmPasswordHandler = e => {
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmitHandler = e => {
        e.preventDefault(); // 이벤트 실행을 막음

        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
        }

        let body = { // 저장된 데이터를 body에 저장
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    navigate('/login')
                }
            })
            .catch(() => {
                alert("Error")
            })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button type='submit'>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default Auth(RegisterPage, false);