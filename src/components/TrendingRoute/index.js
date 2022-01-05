import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import Header from '../Header'
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
  LoaderContainer,
  FailureContainer,
  FailureImg,
  Heading,
  Description,
  RetryBtn,
} from './styledComponent'

const apiStatusConstant = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class TrendingRoute extends Component {
  state = {
    trendingVideoData: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getTrendingData()
  }

  apiSuccess = data => {
    const updatedData = data.videos.map(each => ({
      id: each.id,
      title: each.title,
      thumbnailUrl: each.thumbnail_url,
      channel: each.channel,
      viewCount: each.view_count,
      publishedAt: each.published_at,
    }))
    this.setState({
      trendingVideoData: updatedData,
      apiStatus: apiStatusConstant.success,
    })
  }

  apiFailure = () => {
    this.setState({apiStatus: apiStatusConstant.failure})
  }

  getTrendingData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.apiSuccess(data)
    } else {
      this.apiFailure()
    }
  }

  renderSuccessView = () => {
    const {trendingVideoData} = this.state
    return (
      <HomeVideoListContainer>
        {trendingVideoData.map(each => (
          <TrendingVideoCard key={each.id} videoDetails={each} />
        ))}
      </HomeVideoListContainer>
    )
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

  onClickFailRetry = () => {
    this.getTrendingData()
  }

  renderFailureView = () => (
    <FailureContainer>
      <FailureImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Description>
        We are having some trouble to complete your request. Please try again.
      </Description>
      <RetryBtn type="button" onClick={this.onClickFailRetry}>
        Retry
      </RetryBtn>
    </FailureContainer>
  )

  finalRenderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <HomeBgContainer>
          <HomeLargeLeftBottomContainer>
            <HomeLargeLeftOptionsContainer>
              <Link to="/">
                <HomeLargeLeftOptions>
                  <AiFillHome size={22} /> <OptionsText>Home</OptionsText>
                </HomeLargeLeftOptions>
              </Link>
              <Link to="/trending">
                <HomeLargeLeftOptions>
                  <AiFillFire size={22} />
                  <OptionsText>Trending</OptionsText>
                </HomeLargeLeftOptions>
              </Link>
              <Link to="/gaming">
                <HomeLargeLeftOptions>
                  <SiYoutubegaming size={22} />
                  <OptionsText>Gaming</OptionsText>
                </HomeLargeLeftOptions>
              </Link>
              <Link to="/saved-videos">
                <HomeLargeLeftOptions>
                  <MdPlaylistAdd size={22} />
                  <OptionsText>Saved videos</OptionsText>
                </HomeLargeLeftOptions>
              </Link>
            </HomeLargeLeftOptionsContainer>
            <HomeLargeLeftContactContainer>
              <ContactText>CONTACT US</ContactText>
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
              <ContactDescription>
                Enjoy! Now to see your channels and recommendations!
              </ContactDescription>
            </HomeLargeLeftContactContainer>
          </HomeLargeLeftBottomContainer>

          <HomeLargeRightBottomContainer>
            <PremiumBanner>
              <PremiumLeftContainer>
                <AiFillFire size={32} color="#ff0000" />
              </PremiumLeftContainer>
              <PremiumBannerText>Trending</PremiumBannerText>
            </PremiumBanner>
            <HomeBottomContainer>{this.finalRenderView()}</HomeBottomContainer>
          </HomeLargeRightBottomContainer>
        </HomeBgContainer>
      </>
    )
  }
}

export default TrendingRoute
