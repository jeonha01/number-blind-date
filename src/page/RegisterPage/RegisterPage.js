import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerUser } from "../../featueres/user/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 사용자 입력값 저장 state
  const [userName, setUserName] = useState(""); // 유저 이름
  const [email, setEmail] = useState(""); // 이메일
  const [userPassword, setUserPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [gender, setGender] = useState("남성"); // 기본값: 남성
  // const [birth_date, setBirthDate] = useState(""); // 생년월일
  const [age, setAge] = useState(0); // 나이
  const [nickname, setNickname] = useState(""); // 닉네임
  const [contact, setContact] = useState(""); // 연락 수단단
  const [location, setLocation] = useState(""); // 지역
  const [agreeTerms, setAgreeTerms] = useState(false); // 이용약관 동의 상태
  const [testResponse, setTestResponse] = useState(""); // 🔹 백엔드 응답을 저장할 상태 추가
  const [contactMethod, setContactMethod] = useState("phone");
  const placeholders = {
    phone: "전화번호를 입력하세요.",
    instagram: "인스타 ID를 입력하세요.",
    kakao: "카카오톡 ID를 입력하세요."
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => email.endsWith("@bu.ac.kr");

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    // const formattedBirthDate = new Date(birth_date).toISOString().split("T")[0];

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      alert("올바른 학교 이메일을 입력하세요 (예: example@bu.ac.kr).");
      return;
    }

    // 비밀번호 길이 검사
    if (userPassword.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    // 비밀번호 확인 검사
    if (userPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이용약관 동의 확인
    if (!agreeTerms) {
      alert("서비스 이용약관 및 개인정보 처리방침에 동의해야 합니다.");
      return;
    }

    // JSON 형식으로 콘솔 출력
    console.log(
      JSON.stringify(
        {
          email,
          username: userName,
          password: userPassword,
          gender,
          age,
          nickname, 
          contact, 
          location,
          role: "USER",
        },
        null,
        2
      )
    );

    // Redux 이용
    dispatch(
      registerUser({
        email,
        userName,
        userPassword,
        gender,
        age,
        nickname, 
        contact, 
        location,
        navigate,
      })
    );
  };


  
  

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4">회원가입</h2>
          <Form onSubmit={handleSubmit}>
            {/* 🔹 유저 이름 */}
            <Form.Group controlId="formUserName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="이름을 입력하세요"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
            <br />

            {/* 🔹 이메일 */}
            <Form.Group controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="학교 이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <br />

            {/* 🔹 비밀번호 */}
            <Form.Group controlId="formUserPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 (8자 이상)"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
            </Form.Group>
            <br />

            {/* 🔹 비밀번호 확인 */}
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <br />

            {/* 🔹 성별 선택 */}
            <Form.Group controlId="formGender">
              <Form.Label>성별</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </Form.Select>
            </Form.Group>
            <br />

            {/* 🔹 나이 입력 */}
            <Form.Group controlId="formBirthDate">
              <Form.Label>나이</Form.Label>
              <Form.Control
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>
            <br />
            {/* 🔹 닉네임 입력 */}
            <Form.Group controlId="formLocation">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                placeholder="사용하실 닉네임을 입력하세요" //모든 이름은 닉네임으로 운영됩니다.
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </Form.Group>
            <br />

             {/* 🔹 연락수단 선택 */}
      <Form.Group controlId="contactMethod">
        <Form.Label>연락 수단 선택</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="전화번호"
            name="contactMethod"
            value="phone"
            checked={contactMethod === "phone"}
            onChange={() => setContactMethod("phone")}
          />
          <Form.Check
            type="radio"
            label="인스타 ID"
            name="contactMethod"
            value="instagram"
            checked={contactMethod === "instagram"}
            onChange={() => setContactMethod("instagram")}
          />
          <Form.Check
            type="radio"
            label="카카오톡 ID"
            name="contactMethod"
            value="kakao"
            checked={contactMethod === "kakao"}
            onChange={() => setContactMethod("kakao")}
          />
        </div>
      </Form.Group>

      {/* 🔹 연락정보 입력 */}
      <Form.Group controlId="formLocation">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholders[contactMethod]}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </Form.Group>
            <br />

            {/* 🔹 지역 입력 */}
            <Form.Group controlId="formLocation">
              <Form.Label>지역</Form.Label>
              <Form.Control
                type="text"
                placeholder="지역을 입력하세요"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            <br />

            {/* 🔹 이용약관 동의 */}
            <Form.Group controlId="formTerms">
              <Form.Check
                type="checkbox"
                label="서비스 이용약관 및 개인정보 처리방침에 동의합니다."
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
            </Form.Group>
            <br />

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              disabled={!agreeTerms}
            >
              회원가입
            </Button>
          </Form>

          
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
