import Header from '../Header'
import nxtWatchContext from '../../Context/nxtWatchContext'

import {
  FailureContainer,
  FailureImg,
  Heading,
  Description,
} from './styledComponent'

const NotFoundRoute = () => (
  <nxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      const bgColor = isDark ? '#181818' : '#f9f9f9'
      const textColor = isDark ? '#f9f9f9' : '#181818'
      const logoSrc = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <>
          <Header />
          <FailureContainer bgColor={bgColor}>
            <FailureImg src={logoSrc} alt="not found" />
            <Heading textColor={textColor}>Page Not Found</Heading>
            <Description textColor={textColor}>
              we are sorry, the page you requested could not be found
            </Description>
          </FailureContainer>
        </>
      )
    }}
  </nxtWatchContext.Consumer>
)

export default NotFoundRoute
