import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {auth} from '../_action/user_action'
import {redirect} from "react-router-dom";

const Auth =  function (SpecificComponent, option, adminRout = null) {

    // option 상태
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입이 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res)
                // 로그인 하지 않은 상태
                if(!res.payload.isAuth) {
                    if(option) {
                        redirect("api/users/login")
                    }
                }else { // 로그인 한 상태
                    if(adminRout && !res.payload.isAdmin) {
                        redirect("/")
                    } else {
                        if(option === false) {
                           redirect('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent/>
        )

    }

    return AuthenticationCheck;
}

export default Auth;