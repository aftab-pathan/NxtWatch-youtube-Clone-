import ReactPlayer from 'react-player'
import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {AiFillHome, AiFillFire, AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
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
} from './styledComponent'

const apiStatusConstant = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class VideoItemDetailsRoute extends Component {
  state = {
    videoData: [],
    apiStatus: apiStatusConstant.initial,
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

  renderSuccessView = () => {
    const {videoData} = this.state
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
          }
          return (
            <>
              <VideoDetailsContainer>
                <VideoPlayerContainer>
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="400px"
                  />
                </VideoPlayerContainer>

                <VideoDetailsRightContainer>
                  <VideoName>{title}</VideoName>
                  <VideoMenu>
                    <VideoSmallDetailsRightBottom>
                      <VideoDetailsListName key="views">{`${viewCount} views`}</VideoDetailsListName>
                      <VideoDetailsList key="time">
                        {timeAgo(publishedAt)}
                      </VideoDetailsList>
                    </VideoSmallDetailsRightBottom>

                    <VideoLikeSaveContainer>
                      <LikeSaveBtn>
                        <AiOutlineLike size={22} color="#616e7c" />
                        <BtnText>Like</BtnText>
                      </LikeSaveBtn>
                      <LikeSaveBtn>
                        <BiDislike size={22} color="#616e7c" />
                        <BtnText>Dislike</BtnText>
                      </LikeSaveBtn>
                      <LikeSaveBtn onClick={saveVideo}>
                        <MdPlaylistAdd size={22} color="#616e7c" />
                        <BtnText>Save</BtnText>
                      </LikeSaveBtn>
                    </VideoLikeSaveContainer>
                  </VideoMenu>
                  <HLine />

                  <ChannelDetailsMobile>
                    <ChannelNameLogo>
                      <ChannelLogo src={channel.profile_image_url} alt="" />
                      <ChannelDetailsRight>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelSub>{`${channel.subscriber_count} subscribes`}</ChannelSub>
                      </ChannelDetailsRight>
                    </ChannelNameLogo>
                    <VideoDescription>{description}</VideoDescription>
                  </ChannelDetailsMobile>

                  <ChannelDetailsLarge>
                    <ChannelNameLogo>
                      <ChannelLogo src={channel.profile_image_url} alt="" />
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
            {this.finalRenderView()}
          </HomeLargeRightBottomContainer>
        </HomeBgContainer>
      </>
    )
  }
}

export default VideoItemDetailsRoute
