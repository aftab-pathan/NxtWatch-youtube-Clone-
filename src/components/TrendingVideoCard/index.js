import nxtWatchContext from '../../Context/nxtWatchContext'

import {
  VideoListItem,
  Thumbnail,
  VideoDetailsContainer,
  VideoProfile,
  VideoDetailsRightContainer,
  VideoName,
  VideoSmallDetailsRightBottom,
  VideoLargeDetailsRightBottom,
  VideoLarge2DetailsRightBottom,
  VideoDetailsListName,
  VideoDetailsLargeName,
  VideoDetailsList,
} from './styledComponent'

const TrendingVideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails
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
        const {isDark} = value
        const textColor = isDark ? '#f9f9f9' : '#181818'

        return (
          <VideoListItem to={`/videos/${id}`}>
            <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
            <VideoDetailsContainer>
              <VideoProfile src={channel.profile_image_url} />
              <VideoDetailsRightContainer>
                <VideoName textColor={textColor}>{title}</VideoName>
                <VideoSmallDetailsRightBottom>
                  <VideoDetailsListName>{channel.name}</VideoDetailsListName>
                  <VideoDetailsList>{`${viewCount} views`}</VideoDetailsList>
                  <VideoDetailsList>{timeAgo(publishedAt)}</VideoDetailsList>
                </VideoSmallDetailsRightBottom>

                <VideoLargeDetailsRightBottom>
                  <VideoDetailsLargeName>{channel.name}</VideoDetailsLargeName>
                  <VideoLarge2DetailsRightBottom>
                    <VideoDetailsListName>{`${viewCount} views`}</VideoDetailsListName>
                    <VideoDetailsList>{timeAgo(publishedAt)}</VideoDetailsList>
                  </VideoLarge2DetailsRightBottom>
                </VideoLargeDetailsRightBottom>
              </VideoDetailsRightContainer>
            </VideoDetailsContainer>
          </VideoListItem>
        )
      }}
    </nxtWatchContext.Consumer>
  )
}
export default TrendingVideoCard
