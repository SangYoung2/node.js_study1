import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from '../../../_action/user_action';
import Auth from "../../../hoc/auth";
import {useNavigate} from "react-router-dom";

function LoginPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State (데이터를 저장하는 곳)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    // Email 과 Password를 입력 후 각각에 저장
    const onEmailHandler = e => {
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = e => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = e => {
        e.preventDefault(); // 이벤트 실행을 막음
        
        let body = { // 저장된 데이터를 body에 저장
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    navigate('/')
                }else {
                    alert('Error')
                }
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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type='submit'>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Auth(LoginPage, false);