import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import Popup from './Popup';

function Login() {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const LoginLogics = (data) => {

    const reusers = JSON.parse(localStorage.getItem("users")) || [];

    const validate = reusers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (validate) {
      dispatch(login(validate));
      setPopupMessage(`Hey ${validate.name} welcome to Rasoi Ghar`);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/veg");
      }, 2000);
    } else {
      setPopupMessage("Login Failed! Please check your credentials.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }

    reset();
  }

  return (
    <>
      <Popup show={showPopup} message={popupMessage} />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleSubmit(LoginLogics)}>
            <input
              type="email"
              placeholder='Enter your email'
              {...register("email", { required: true })}
            />

            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Enter your password'
                {...register("password", { required: true })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
                  cursor: 'pointer', fontSize: '1.2rem', userSelect: 'none'
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>
          <p className="toggle-form">
            Don't have an account? <Link to="/Register">Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login;