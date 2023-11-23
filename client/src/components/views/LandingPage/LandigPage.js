import React, {useEffect} from 'react'
import axios from 'axios'
import Auth from "../../../hoc/auth";

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
            .then(res => {
                console.log(res.data)
            })
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(res => {
                if(res.data.success){
                    alert("로그아웃 성공")
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default Auth(LandingPage, null)
