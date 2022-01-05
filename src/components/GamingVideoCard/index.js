import {
  VideoListItem,
  Thumbnail,
  VideoDetailsContainer,
  VideoDetailsRightContainer,
  VideoName,
  VideoSmallDetailsRightBottom,
  VideoDetailsList,
} from './styledComponent'

const GamingVideoCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <VideoListItem to={`/videos/${id}`}>
      <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
      <VideoDetailsContainer>
        <VideoDetailsRightContainer>
          <VideoName>{title}</VideoName>
          <VideoSmallDetailsRightBottom>
            <VideoDetailsList>{`${viewCount} views`}</VideoDetailsList>
            <VideoDetailsList>Worldwide</VideoDetailsList>
          </VideoSmallDetailsRightBottom>
        </VideoDetailsRightContainer>
      </VideoDetailsContainer>
    </VideoListItem>
  )
}
export default GamingVideoCard
