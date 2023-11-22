import React, {useState} from 'react';
import {Axios} from "axios";
import {useDispatch} from "react-redux";
import {LOGIN_USER} from "../../../_action/types";

function LoginPage(props) {
    const dispatch = useDispatch();

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

        dispatch(LOGIN_USER(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
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
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;