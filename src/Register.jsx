import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from './redux/authSlice';
import Popup from './Popup';

function Register() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const SubmitLogics = (data) => {
        const { confirmPassword, ...userData } = data; // Exclude confirmPassword from stored data
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        // Automatically log in the user after registration
        dispatch(login(userData));

        setPopupMessage(`Hey ${userData.name} welcome to Rasoi Ghar`);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            navigate('/veg'); // Redirect to a relevant page
        }, 2000);
        reset();
    }

  return (
    <>
      <Popup show={showPopup} message={popupMessage} />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit(SubmitLogics)}>
            <input type="text" placeholder='Full Name' 
            {...register("name", {required: true})} 
            />

            <input type="email" placeholder='Enter email id'
            {...register("email", {required: true})}
            />

            <input type="tel" placeholder='Enter Mobile No.'
            {...register("mobile", {required: true})} 
            />

            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Enter password'
                {...register("password", {required: true})} 
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '1.2rem', userSelect: 'none' }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder='Confirm password'
                {...register("confirmPassword", {
                  required: true, 
                  validate: (val) => {
                    if (watch('password') !== val) return "Your passwords do not match";
                  }
                })} 
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '1.2rem', userSelect: 'none' }}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {errors.confirmPassword && <p style={{color: 'red', fontSize: '0.8rem', marginTop: '-10px', marginBottom: '10px', textAlign: 'left'}}>{errors.confirmPassword.message}</p>}

            <button type="submit"> Register </button>
          </form>
          <p className="toggle-form">
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}
export default Register;