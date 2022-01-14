import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import nxtWatchContext from './Context/nxtWatchContext'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDark: false,
    savedVideoData: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  updateSavedVideo = videoData => {
    const {savedVideoData} = this.state
    const checkVideo = savedVideoData.filter(each => each.id === videoData.id)
    if (checkVideo.length === 0) {
      this.setState(prevState => ({
        savedVideoData: [...prevState.savedVideoData, videoData],
      }))
    } else {
      this.setState(prevState => ({
        savedVideoData: prevState.savedVideoData.filter(
          each => each.id !== videoData,
        ),
      }))
    }
  }

  render() {
    const {isDark, savedVideoData} = this.state
    return (
      <nxtWatchContext.Provider
        value={{
          isDark,
          savedVideoData,
          changeTheme: this.changeTheme,
          updateSavedVideo: this.updateSavedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <Route component={NotFoundRoute} />
        </Switch>
      </nxtWatchContext.Provider>
    )
  }
}

export default App
