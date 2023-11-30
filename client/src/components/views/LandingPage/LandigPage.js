import React, {useEffect} from 'react'
import axios from 'axios'
import Auth from "../../../hoc/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {log} from "debug";
import NavBar from "../NavBar/NavBar";


function LandingPage(props) {
    const navigate = useNavigate();
    let userAuth = false;

    useEffect(() => {
        axios.get('/api/hello')
            .then(res => {
                console.log(res.data)
            })
    }, [])

    const onClickHandler = e => {
        if(e.target.innerText === '로그아웃') {
            axios.get('/api/users/logout')
                .then(res => {
                    if(res.data.success){
                        alert("로그아웃 성공")
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            navigate('login')
        }
    }

    useEffect(() => {
        axios.get('/api/users/auth')
            .then(res => {
                userAuth = res.data.isAuth;
            })
            .catch(err => {
                console.log(err)})
    })

    function UserGreeting(props) {
        return(
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'
            }}>
                <h2>시작페이지</h2><br/>
                <button onClick={onClickHandler}>로그아웃</button>
            </div>
        )
    }

    function GuestGreeting(props){
        return(
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'
            }}>
                <h2>시작페이지</h2><br/>
                <button onClick={onClickHandler}>로그인</button>
            </div>
        )
    }
    if(!userAuth) {
        return <GuestGreeting/>
    }else {
        return <UserGreeting/>
    }
}

export default Auth(LandingPage, null)
