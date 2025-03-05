import api from "../../utils/api";
import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginWithEmail } from "../../featueres/user/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [userPassword, setPassword] = useState("");
  const { user } = useSelector((state) => state.user)
  const { loginError } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors())
    }
  }, [navigate, loginError, dispatch])

  const handleLoginWithEmail = (event) => {
    event.preventDefault()
    dispatch(loginWithEmail({ email, userPassword }))
  }

  if (user) {
    navigate('/')
  }

  return (
    <div className="display-center">
      {loginError && <div>{loginError}</div>}
      <Form className="login-box" onSubmit={handleLoginWithEmail}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/RegisterPage">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
