import ReactPlayer from 'react-player'
import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {
  AiFillHome,
  AiFillFire,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
} from 'react-icons/ai'
import nxtWatchContext from '../../Context/nxtWatchContext'
import Header from '../Header'

import {
  HomeBgContainer,
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
  VideoDetailsContainer,
  VideoPlayerContainer,
  VideoDetailsRightContainer,
  VideoName,
  VideoMenu,
  VideoSmallDetailsRightBottom,
  VideoDetailsListName,
  VideoDetailsList,
  VideoLikeSaveContainer,
  LikeSaveBtn,
  BtnText,
  HLine,
  ChannelDetailsMobile,
  ChannelDetailsLarge,
  ChannelNameLogo,
  ChannelLogo,
  ChannelDetailsRight,
  ChannelName,
  ChannelSub,
  VideoDescription,
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
// const likeStatusConstant = {
//   like: 'LIKE',
//   disLike: 'DISLIKE',
//   initial: 'INITIAL',
// }

class VideoItemDetailsRoute extends Component {
  state = {
    videoData: [],
    apiStatus: apiStatusConstant.initial,
    isLiked: false,
    isDisLiked: false,
    isSave: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  apiSuccess = videoData => {
    const updatedData = {
      id: videoData.id,
      title: videoData.title,
      thumbnailUrl: videoData.thumbnail_url,
      channel: videoData.channel,
      viewCount: videoData.view_count,
      publishedAt: videoData.published_at,
      description: videoData.description,
      videoUrl: videoData.video_url,
    }
    this.setState({
      videoData: updatedData,
      apiStatus: apiStatusConstant.success,
    })
  }

  apiFailure = () => {
    this.setState({apiStatus: apiStatusConstant.failure})
  }

  getVideoData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.apiSuccess(data.video_details)
      console.log(data)
    } else {
      this.apiFailure()
    }
  }

  OnClickLikeBtn = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: prevState.isLiked,
    }))
  }

  OnClickDisLikeBtn = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: prevState.isDisLiked,
    }))
  }

  renderSuccessView = () => {
    const {videoData, isLiked, isDisLiked, isSave} = this.state
    const {
      videoUrl,
      channel,
      title,
      publishedAt,
      viewCount,
      description,
    } = videoData
    const timeAgo = date => {
      const formattedDate = new Date(date)
      const seconds = Math.floor((new Date() - formattedDate) / 1000)

      let interval = seconds / 31536000

      if (interval > 1) {
        return `${Math.floor(interval)} years ago`
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return `${Math.floor(interval)} months ago`
      }
      interval = seconds / 86400
      if (interval > 1) {
        return `${Math.floor(interval)} days ago`
      }
      interval = seconds / 3600
      if (interval > 1) {
        return `${Math.floor(interval)} hours ago`
      }
      interval = seconds / 60
      if (interval > 1) {
        return `${Math.floor(interval)} minutes ago`
      }
      return `${Math.floor(interval)} seconds ago`
    }
    return (
      <nxtWatchContext.Consumer>
        {value => {
          const {updateSavedVideo} = value
          const saveVideo = () => {
            updateSavedVideo(videoData)
            this.setState(prevState => ({isSave: !prevState.isSave}))
          }
          const {isDark} = value
          const bgMainColor = isDark ? '#0f0f0f' : '#f9f9f9'
          const textColor = isDark ? '#f9f9f9' : '#181818'
          const LikeLogo = isLiked ? (
            <>
              <AiFillLike size={22} color="#2563eb" />
              <BtnText textColor="#2563eb">Like</BtnText>{' '}
            </>
          ) : (
            <>
              <AiOutlineLike size={22} color="#64748b" />
              <BtnText textColor="#64748b">Like</BtnText>
            </>
          )
          const disLikeLogo = isDisLiked ? (
            <>
              <AiFillDislike size={22} color="#2563eb" />
              <BtnText textColor="#2563eb">Dislike</BtnText>
            </>
          ) : (
            <>
              <AiOutlineDislike size={22} color="#64748b" />
              <BtnText textColor="#64748b">Dislike</BtnText>
            </>
          )
          const savePlaylistLogo = isSave ? (
            <>
              <MdPlaylistAddCheck size={22} color="#2563eb" />
              <BtnText textColor="#2563eb">Saved</BtnText>
            </>
          ) : (
            <>
              <MdPlaylistAdd size={22} color="#64748b" />
              <BtnText textColor="#64748b">Save</BtnText>
            </>
          )
          return (
            <>
              <VideoDetailsContainer
                bgColor={bgMainColor}
                data-testid="videoItemDetails"
              >
                <VideoPlayerContainer>
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="400px"
                  />
                </VideoPlayerContainer>

                <VideoDetailsRightContainer>
                  <VideoName textColor={textColor}>{title}</VideoName>
                  <VideoMenu>
                    <VideoSmallDetailsRightBottom>
                      <VideoDetailsListName>{`${viewCount} views`}</VideoDetailsListName>
                      <VideoDetailsList>
                        {timeAgo(publishedAt)}
                      </VideoDetailsList>
                    </VideoSmallDetailsRightBottom>

                    <VideoLikeSaveContainer>
                      <LikeSaveBtn onClick={this.OnClickLikeBtn}>
                        {LikeLogo}
                      </LikeSaveBtn>
                      <LikeSaveBtn onClick={this.OnClickDisLikeBtn}>
                        {disLikeLogo}
                      </LikeSaveBtn>
                      <LikeSaveBtn onClick={saveVideo}>
                        {savePlaylistLogo}
                      </LikeSaveBtn>
                    </VideoLikeSaveContainer>
                  </VideoMenu>
                  <HLine />

                  <ChannelDetailsMobile>
                    <ChannelNameLogo>
                      <ChannelLogo
                        src={channel.profile_image_url}
                        alt="channel logo"
                      />
                      <ChannelDetailsRight>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelSub>{`${channel.subscriber_count} subscribes`}</ChannelSub>
                      </ChannelDetailsRight>
                    </ChannelNameLogo>
                    <VideoDescription>{description}</VideoDescription>
                  </ChannelDetailsMobile>

                  <ChannelDetailsLarge>
                    <ChannelNameLogo>
                      <ChannelLogo
                        src={channel.profile_image_url}
                        alt="channel logo"
                      />
                      <ChannelDetailsRight>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelSub>{`${channel.subscriber_count} subscribes`}</ChannelSub>
                        <VideoDescription>{description}</VideoDescription>
                      </ChannelDetailsRight>
                    </ChannelNameLogo>
                  </ChannelDetailsLarge>
                </VideoDetailsRightContainer>
              </VideoDetailsContainer>
            </>
          )
        }}
      </nxtWatchContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

  onClickFailRetry = () => {
    this.getVideoData()
  }

  renderFailureView = () => (
    <nxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const failSrc = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <FailureContainer>
            <FailureImg src={failSrc} alt="failure view" />
            <Heading>Oops! Something Went Wrong</Heading>
            <Description>
              We are having some trouble to complete your request. Please try
              again.
            </Description>
            <RetryBtn type="button" onClick={this.onClickFailRetry}>
              Retry
            </RetryBtn>
          </FailureContainer>
        )
      }}
    </nxtWatchContext.Consumer>
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
      <nxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const bgColor = isDark ? '#181818' : '#f9f9f9'
          const textColor = isDark ? '#f9f9f9' : '#181818'
          return (
            <>
              <Header />
              <HomeBgContainer bgColor={bgColor} data-testid="videoItemDetails">
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
                        <OptionsText textColor={textColor}>
                          Trending
                        </OptionsText>
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
                  {this.finalRenderView()}
                </HomeLargeRightBottomContainer>
              </HomeBgContainer>
            </>
          )
        }}
      </nxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetailsRoute
