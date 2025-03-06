import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../featueres/user/userSlice'

const IntroPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div>
      IntroPage
      <br/>
      <button onClick={()=> navigate("/login")}>로그인</button>
      <br/>
      <br/>
      <button onClick={()=> navigate("/MatchingPage")}>매칭페이지</button>
      <br/>
      <br/>
      <button onClick={() => dispatch(logout())}>로그아웃</button>
      <br/>
      
    </div>
  )
}

export default IntroPage
