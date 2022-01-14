import styled from 'styled-components'

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  background-color: ${props => props.bgColor};
  width: 100%;
  min-height: 90vh;
`
export const FailureImg = styled.img`
  margin-right: 15px;
  width: 50%;
  margin-bottom: 10px;
`

export const Heading = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${props => props.textColor};
`
export const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  color: ${props => props.textColor};
`
