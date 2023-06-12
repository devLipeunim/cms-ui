import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Login from "./assets/Login.png"
import Swal from 'sweetalert2'
import Logo from "./assets/LogoUi.png"
import './SignLogin.css'

const LoginForm = () => {
     const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [matricNumber, setMatricNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({})
  const[isLoading, setIsLoading] = useState(false)
  const BaseUrl = 'https://cms-api-o973.onrender.com'

  useEffect(() => {
     let token = localStorage.getItem('token')
     let claims = JSON.parse(localStorage.getItem('claims'))
     if(token&& claims.userName){
          navigate('/admin')
     }else if(token && claims.matricNumber){
          navigate('/timetables')
     }
  }, [])
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const handleLogin = (e) => {
    e.preventDefault();
     let payload = {
          userName: username,
          password: password
     }
     setIsLoading(true)
     fetch(`${BaseUrl}/api/v1/admin/login`, {
          headers:{
               'content-type':'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
     }).then(response => {return response.json()}).then((data) => {
          if(data.status == 'Ok'){
               setIsLoading(false)
               Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Thanks'
               }).then(() => {
                    localStorage.setItem('token', data.data.token);
                    setUserData(data.data.claims);
                    localStorage.setItem('claims', JSON.stringify(data.data.claims));
                    navigate('/admin')
                    setMatricNumber('')
               })
          }else{ 
               setIsLoading(false)
               Swal.fire({
                    title: 'Error!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Close'
               })
               
          }
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
     setIsLoading(true)
     fetch(`${BaseUrl}/api/v1/student/login`, {
          headers:{
               'content-type':'application/json'
          },
          method: 'POST',
          body: JSON.stringify(payload)
     }).then(response => {return response.json()}).then((data) => {
          if(data.status == 'Ok'){
               setIsLoading(false)
               Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Thanks'
               }).then(() => {
                    localStorage.setItem('token', data.data.token);
                    setUserData(data.claims);
                    localStorage.setItem('claims', JSON.stringify(data.data.claims));
                    navigate('/timetables')
                    setMatricNumber('')
               })
          }else{ 
               setIsLoading(false)
               Swal.fire({
                    title: 'Error!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Close'
               })
               setMatricNumber('')
          }
     })

  }

  return (
    <div className="login-admin">
      <img src={Login} alt="login image" className="login__img" />
      <div className={isAdmin ? "login admin" : "login"} id="loginForm">
        <form onSubmit={isAdmin? handleLogin: handleStudentLogin} className="login__form">
          <img src={Logo} className="uiLogo" alt="Ui Logo" />
          <h1 className="login__title">{isAdmin ? "ADMIN" : "STUDENT"}</h1>

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

          <button type="submit" className="login__button" disabled= {isLoading? true: false}>
            {isLoading? 'Loading...': "Login"}
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

