import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isErrorFound: false,
    errorMsg: '',
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({isErrorFound: true, errorMsg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isErrorFound, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <img
          className="login-img"
          src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1695973533/InstaSharePics/Illustration_1_nqicde.png"
          alt="website login"
        />
        <div className="login-container">
          <div className="login-website-logo-container">
            <img
              className="login-website-img"
              src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1695974207/InstaSharePics/logo_gqdm5p.png"
              alt="website logo"
            />
            <p className="webiste-logo-text">Insta Share</p>
          </div>
          <form
            className="login-form-container"
            onSubmit={this.onSubmitUserDetails}
          >
            <div className="label-input-container">
              <label className="input-label-text" htmlFor="username">
                username
              </label>
              <input
                className="username-input"
                id="username"
                type="text"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="label-input-container">
              <label className="input-label-text" htmlFor="password">
                password
              </label>
              <input
                className="password-input"
                id="password"
                type="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {isErrorFound && <p className="error-msg">{errorMsg}</p>}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
