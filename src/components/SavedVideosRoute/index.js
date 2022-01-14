import {Link} from 'react-router-dom'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import Header from '../Header'
import nxtWatchContext from '../../Context/nxtWatchContext'
import TrendingVideoCard from '../TrendingVideoCard'

import {
  HomeBgContainer,
  PremiumBanner,
  PremiumLeftContainer,
  PremiumBannerText,
  HomeBottomContainer,
  HomeVideoListContainer,
  HomeLargeRightBottomContainer,
  HomeLargeLeftBottomContainer,
  HomeLargeLeftOptionsContainer,
  HomeLargeLeftOptions,
  OptionsText,
  HomeLargeLeftContactContainer,
  ContactText,
  ContactLogoContainer,
  ContactLogo,
  ContactDescription,
  FailureContainer,
  FailureImg,
  Heading,
  Description,
} from './styledComponent'

const SavedVideosRoute = () => {
  const renderNoSearch = () => (
    <nxtWatchContext.Consumer>
      {value => {
        const {isDark} = value

        const textColor = isDark ? '#f9f9f9' : '#181818'
        return (
          <FailureContainer>
            <FailureImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <Heading textColor={textColor}>No saved videos found</Heading>
            <Description textColor={textColor}>
              You can save your videos while watching them
            </Description>
          </FailureContainer>
        )
      }}
    </nxtWatchContext.Consumer>
  )

  const renderSuccessView = () => (
    <nxtWatchContext.Consumer>
      {value => {
        const {savedVideoData} = value
        return (
          <>
            {savedVideoData.length === 0 ? (
              renderNoSearch()
            ) : (
              <HomeVideoListContainer>
                {savedVideoData.map(each => (
                  <TrendingVideoCard key={each.id} videoDetails={each} />
                ))}
              </HomeVideoListContainer>
            )}
          </>
        )
      }}
    </nxtWatchContext.Consumer>
  )

  return (
    <nxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const bgColor = isDark ? '#0f0f0f' : '#f9f9f9'
        const bgMainColor = isDark ? '#231f20' : '#f9f9f9'
        const bgBannerColor = isDark ? '#424242' : '#ebebeb'
        const textColor = isDark ? '#f9f9f9' : '#181818'
        return (
          <>
            <Header />
            <HomeBgContainer bgColor={bgColor} data-testid="savedVideos">
              <HomeLargeLeftBottomContainer>
                <HomeLargeLeftOptionsContainer>
                  <Link to="/">
                    <HomeLargeLeftOptions>
                      <AiFillHome size={22} color={textColor} />{' '}
                      <OptionsText textColor={textColor}>Home</OptionsText>
                    </HomeLargeLeftOptions>
                  </Link>
                  <Link to="/trending">
                    <HomeLargeLeftOptions>
                      <AiFillFire size={22} color={textColor} />
                      <OptionsText textColor={textColor}>Trending</OptionsText>
                    </HomeLargeLeftOptions>
                  </Link>
                  <Link to="/gaming">
                    <HomeLargeLeftOptions>
                      <SiYoutubegaming size={22} color={textColor} />
                      <OptionsText textColor={textColor}>Gaming</OptionsText>
                    </HomeLargeLeftOptions>
                  </Link>
                  <Link to="/saved-videos">
                    <HomeLargeLeftOptions>
                      <MdPlaylistAdd size={22} color={textColor} />
                      <OptionsText textColor={textColor}>
                        Saved videos
                      </OptionsText>
                    </HomeLargeLeftOptions>
                  </Link>
                </HomeLargeLeftOptionsContainer>
                <HomeLargeLeftContactContainer>
                  <ContactText textColor={textColor}>CONTACT US</ContactText>
                  <ContactLogoContainer>
                    <ContactLogo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                    />
                    <ContactLogo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                    />
                    <ContactLogo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                    />
                  </ContactLogoContainer>
                  <ContactDescription textColor={textColor}>
                    Enjoy! Now to see your channels and recommendations!
                  </ContactDescription>
                </HomeLargeLeftContactContainer>
              </HomeLargeLeftBottomContainer>

              <HomeLargeRightBottomContainer>
                <PremiumBanner
                  bgBannerColor={bgBannerColor}
                  data-testid="banner"
                >
                  <PremiumLeftContainer>
                    <MdPlaylistAdd size={32} color="#ff0000" />
                  </PremiumLeftContainer>
                  <PremiumBannerText textColor={textColor}>
                    Saved Videos
                  </PremiumBannerText>
                </PremiumBanner>
                <HomeBottomContainer bgMainColor={bgMainColor}>
                  {renderSuccessView()}
                </HomeBottomContainer>
              </HomeLargeRightBottomContainer>
            </HomeBgContainer>
          </>
        )
      }}
    </nxtWatchContext.Consumer>
  )
}

export default SavedVideosRoute
