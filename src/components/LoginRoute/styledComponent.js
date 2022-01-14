import styled from 'styled-components'

export const LoginBgContainer = styled.div`
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const LoginCard = styled.div`
  min-height: 400px;
  background-color: ${props => props.bgCard};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 90%;
  padding: 10px;
  border-radius: 10px;
  padding-right: 20px;
  padding-left: 20px;
`
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
export const Logo = styled.img`
  align-self: center;
  margin-bottom: 30px;
  width: 40%;
`
export const InputValue = styled.input`
  width: 100%;
  padding: 10px;
  padding-left: 20px;
  border: 1px #94a3b8 solid;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 15px;
  color: #606060;
  outline: none;
  background-color: transparent;
`
export const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
  color: #606060;
  margin-bottom: 8px;
`
export const ShowPassContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
  align-items: center;
`
export const InputCheckBox = styled.input`
  height: 20px;
  width: 20px;
`
export const LabelCheckBox = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #231f20;
  margin-left: 5px;
`
export const LoginBtn = styled.button`
  align-self: stretch;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  background-color: #3b82f6;
  height: 50px;
  border: none;
  border-radius: 8px;
`
export const ErrMsg = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #ff0000;
`
