import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import './AppLayout.style.css'
const AppLayout = ({authenticate, setAuthenticate}) => {
//   $ npm i @fortawesome/fontawesome-svg-core
// $ npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
// $ npm i @fortawesome/react-fontawesome
const navigate = useNavigate();
  const menuList = [
    '공지사항',
    '내정보',
    '매칭',
    'AI매칭',
  ];
  const [width, setWidth] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const goToLogin = () => {
    navigate('/login');
  };

  const goToLogout = () => {
    setAuthenticate(false);
  };
  return (
    <div>
      <nav>
      <div className='applayout'>
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>
        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      <div className="nav-container">
        <div>
          <FontAwesomeIcon
            className="burger-menu"
            icon={faBars}
            onClick={() => setWidth(250)}
          />
        </div>
        <div className="login-section">
          {authenticate ? (
            <div className="navbar-container">
              <div className="button-group">
                <div className="login-button" onClick={goToLogout}>
                  <FontAwesomeIcon className="login-icon" icon={faUser} />
                  <div>로그아웃</div>
                </div>
                
                
                
              </div>
              
            </div>
          ) : (
            <div className="navbar-container">
              <div className="button-group">
                <div className="login-button" onClick={goToLogin}>
                  <FontAwesomeIcon className="login-icon" icon={faUser} />
                  <div>로그인</div>
                </div>
                
                
                
              </div>
              
            </div>
          )}
          
        </div>
        <div className="nav-section">
          <Link to={'/'} className="login-button">
            <img
              width={100}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMTobnkBhXqT2y97l05H0Yqq30INTslkMwA&s"
              alt=""
            />
          </Link>
        </div>
        
      </div>
    </div>
      </nav>
      <main>
        <Outlet /> {/* 라우터가 렌더링될 공간 */}
      </main>
    </div>
  )
}

export default AppLayout
