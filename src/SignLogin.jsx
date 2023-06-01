import React, { useState } from 'react';
import Login from "./assets/Login.png"
import Logo from "./assets/LogoUi.png"
import './SignLogin.css'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [matricNumber, setMatricNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BaseUrl = 'https://cms-api-o973.onrender.com'

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
     let payload = {
          userName: username,
          password: password
     }
     console.log(payload)
     fetch(`${BaseUrl}/api/v1/admin/login`, {
          headers:{
               'content-type':'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
     }).then(response => {return response.json()}).then((data) => {
          console.log(data)
     })

  };

  const switchToAdmin = () => {
    setIsAdmin(true);
  };

  const switchToStudent = () => {
    setIsAdmin(false);
  };

  const handleStudentLogin = (e) => {
     e.preventDefault()
     let payload = {
          matricNumber: matricNumber
     }
     fetch(`${BaseUrl}/api/v1/student/login`, {
          headers:{
               'content-type':'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
     }).then(response => {return response.json()}).then((data) => {
          console.log(data)
     })

  }

  return (
    <div className="login-admin">
      <img src={Login} alt="login image" className="login__img" />
      <div className={isAdmin ? "login admin" : "login"} id="loginForm">
        <form onSubmit={isAdmin? handleLogin: handleStudentLogin} className="login__form">
          <img src={Logo} className="uiLogo" alt="Ui Logo" />
          <h1 className="login__title">{isAdmin ? "Admin" : "Student"}</h1>

          <div className="login__content">
            {isAdmin ? (
              <>
                <div className="login__box">
                  <i className="ri-user-3-line login__icon"></i>

                  <div className="login__box-input">
                    <input
                      type="text"
                      required
                      className="login__input"
                      placeholder=" "
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="" className="login__label">
                      Username
                    </label>
                  </div>
                </div>

                <div className="login__box">
                  <i className="ri-lock-2-line login__icon"></i>

                  <div className="login__box-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="login__input"
                      id="login-pass"
                      placeholder=" "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="" className="login__label">
                      Password
                    </label>
                    <i
                      className={
                        showPassword
                          ? "ri-eye-line login__eye"
                          : "ri-eye-off-line login__eye"
                      }
                      onClick={togglePasswordVisibility}
                      id="login-eye"
                    ></i>
                  </div>
                </div>
              </>
            ) : (
              <div className="login__box">
                <i className="ri-user-3-line login__icon"></i>

                <div className="login__box-input">
                  <input
                    type="text"
                    required
                    className="login__input"
                    placeholder=" "
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                  />
                  <label htmlFor="" className="login__label">
                    Matric Number
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="login__check">
            <div className="login__check-group">
              <input type="checkbox" className="login__check-input" />
              <label htmlFor="" className="login__check-label">
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="login__button">
            Login
          </button>

          <p className="login__register">
            {isAdmin ? "Are you a student?" : "Are you an admin?"}{" "}
            <a
              onClick={isAdmin ? switchToStudent : switchToAdmin}
              href="#"
            >
              Click here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
