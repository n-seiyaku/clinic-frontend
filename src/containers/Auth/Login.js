import './style.scss'

import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { userService } from '../../services'

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const handleLogin = async () => {
    try {
      const res = await userService.handleLogin(email, password)
      const userData = res.data
      if (userData && userData.errCode !== 0) {
        setErrMessage(userData.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-title">Login</div>
        <p className="form-description">Sign in and start managing your candidates!</p>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setEmail(event.target.value)
          }}
          required
          autoFocus
        ></input>
        <br />
        <div className="password-container">
          <input
            className="login-input"
            type={isShowPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            required
          />
          <span className="toggle-icon" onClick={handleShowHidePassword}>
            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
        </div>
        <div>{errMessage ? errMessage : ''}</div>
        <div className="login-options">
          <div className="remember-container">
            <input id="remember-button" className="remember-button" type="checkbox" title="Remember me"></input>
            <label htmlFor="remember-button">Remember me</label>
          </div>
          <Link className="forgot-password" to="/login">
            Forgot password?
          </Link>
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div className="decor-footer">
        <svg width="100%" height="100%" viewBox="0 0 1280 111" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0L53 4.17052C107 8.34104 213 16.6821 320 30.7977C427 45.2341 533 65.7659 640 69.9364C747 74.1069 853 61.5954 960 57.7457C1067 53.5751 1173 57.7457 1227 59.6705L1280 61.5954V111H1227C1173 111 1067 111 960 111C853 111 747 111 640 111C533 111 427 111 320 111C213 111 107 111 53 111H0V0Z"
            fill="#20DF7F"
            fillOpacity="0.09"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 44.4L42.6667 53.28C85.3333 62.16 170.667 79.92 256 75.48C341.333 71.04 426.667 44.4 512 26.64C597.333 8.88 682.667 0 768 0C853.333 0 938.667 8.88 1024 24.42C1109.33 39.96 1194.67 62.16 1237.33 73.26L1280 84.36V111H1237.33C1194.67 111 1109.33 111 1024 111C938.667 111 853.333 111 768 111C682.667 111 597.333 111 512 111C426.667 111 341.333 111 256 111C170.667 111 85.3333 111 42.6667 111H0V44.4Z"
            fill="#E5E5E5"
            fillOpacity="0.13"
          />
        </svg>
      </div>
    </div>
  )
}

export default Login
