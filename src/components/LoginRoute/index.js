import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import nxtWatchContext from '../../Context/nxtWatchContext'

import {
  LoginBgContainer,
  LoginCard,
  LoginForm,
  Logo,
  InputValue,
  Label,
  ShowPassContainer,
  InputCheckBox,
  LabelCheckBox,
  LoginBtn,
  ErrMsg,
} from './styledComponent'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showPass: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({showPass: !prevState.showPass}))
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errMsg => {
    this.setState({errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errMsg, showPass} = this.state
    const passType = showPass ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    return (
      <>
        {jwtToken !== undefined ? (
          <Redirect to="/" />
        ) : (
          <nxtWatchContext.Consumer>
            {value => {
              const {isDark} = value
              const bgColor = isDark ? '#181818' : '#f9f9f9'
              const bgCard = isDark ? '#313131' : '#f9f9f9'
              const logoSrc = isDark
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              return (
                <LoginBgContainer bgColor={bgColor}>
                  <LoginCard bgCard={bgCard}>
                    <LoginForm onSubmit={this.onSubmitForm}>
                      <Logo src={logoSrc} alt="website logo" />
                      <Label htmlFor="username">USERNAME</Label>
                      <InputValue
                        type="text"
                        id="username"
                        value={username}
                        onChange={this.onChangeUsername}
                      />
                      <Label htmlFor="password">PASSWORD</Label>
                      <InputValue
                        type={passType}
                        id="password"
                        value={password}
                        onChange={this.onChangePassword}
                      />
                      <ShowPassContainer>
                        <InputCheckBox
                          type="checkbox"
                          id="showPass"
                          onChange={this.onChangeCheckBox}
                        />
                        <LabelCheckBox htmlFor="showPass">
                          Show Password
                        </LabelCheckBox>
                      </ShowPassContainer>
                      <LoginBtn type="submit">Login</LoginBtn>
                      {errMsg !== '' ? <ErrMsg>{`*${errMsg}`}</ErrMsg> : null}
                    </LoginForm>
                  </LoginCard>
                </LoginBgContainer>
              )
            }}
          </nxtWatchContext.Consumer>
        )}
      </>
    )
  }
}
export default LoginRoute
