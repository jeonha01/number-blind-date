import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, createPost } from '../../../featueres/post/postSlice';
import './NewPostItDialog.style.css';



const NewPostItDialog = ({ showDialog, setShowDialog }) => {
  const dispatch = useDispatch();
  const {error, success, selectedPost} = useSelector((state) => state.post)
  // const {user} = useSelector((state) => state.user)
  const InitialFormData = {
    mbti: "",
    height: "",
    highlight: "",
    hobbies: [],
  };
  const [formData, setFormData] = useState({ ...InitialFormData });
  const [selectedHobby, setSelectedHobby] = useState([]);

  
  useEffect(() => {
    if (success) setShowDialog(false); // 성공적으로 submit했으면 다이어로그 즉 팝업창 닫아주는 로직
  }, [success]); // 성공못했으면 그대로 열어 놓음

  useEffect(() => {
    if (error || !success) {
      dispatch(clearError());
    }
  },[error, success, dispatch])

  // Redux의 user 정보가 변경될 때 formData 업데이트
  // useEffect(() => {
  //   if (user) {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       nickname: user.nickname,
  //       contact: user.contact,
  //       age: user.age,
  //     }));
  //   }
  // }, [user]);

  const handleClose = () => {
    //모든걸 초기화시키고;
    // 다이얼로그 닫아주기
    // 1. 초기화할 상태 예시
    // 2. 모달 닫기
    setShowDialog(false); // 모달을 닫음
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  

  const handleTagChange = (tag) => {
    setSelectedHobby((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
    setFormData((prevState) => ({
      ...prevState,
      
        ...prevState.post,
        hobbies: selectedHobby.includes(tag)
          ? selectedHobby.filter((t) => t !== tag)
          : [...selectedHobby, tag],
      
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 최종적으로 Redux user 정보와 formData를 합쳐서 제출
    

    console.log('Submitted Data:', formData);
    dispatch(createPost(formData));
  };
  return (
    <Modal show={showDialog} onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title>포스트잇 작성</Modal.Title>
      </Modal.Header>
      {/* {error && (
        <div className="error-message">
          <Alert variant="danger">{error}</Alert>
        </div>
      )} */}
      <Form className="form-container" onSubmit={handleSubmit}>
        <div>한번 작성한 포스트잇은 수정 및 삭제가 불가능 하오니 신중하게 작성 부탁드려요!</div>
        {/* <div>닉네임 : {user && user.nickname}</div>

        <div>나이 : {user && user.age}</div>

        <div>연락 방법 : {user && user.contact}</div> */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="mbti">
            <Form.Label>MBTI</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="mbti를 입력해주세요."
              required
              value={formData.mbti}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="height">
            <Form.Label>키</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="number"
              placeholder="키를 입력해주세요."
              required
              value={formData.height}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="highlight">
            <Form.Label>어필 or 하고 싶은 말</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="어필 or 하고 싶은 말"
              required
              value={formData.highlight}
            />
          </Form.Group>
        </Row>

        <hr />
        <h4>취미</h4>
        {[
          '운동',
          '독서',
          '음악 감상',
          '요리',
          '여행',
          '게임',
          '영화 감상',
          '사진 촬영',
          '미술/드로잉',
          '글쓰기',
          '명상',
          '등산',
          '자전거 타기',
          '댄스',
          '캠핑',
          '악기 연주',
        ].map((tag) => (
          <button
            type="button"
            key={tag}
            className={`interest-checkbox-button ${
              selectedHobby.includes(tag) ? 'checked' : ''
            }`}
            onClick={() => handleTagChange(tag)}
          >
            {tag}
          </button>
        ))}
        <hr />
        <Button
          variant="secondary"
          className="custom-button-submit-edit"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default NewPostItDialog;