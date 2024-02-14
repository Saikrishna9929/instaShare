import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import ProfilePage from '../ProfilePage'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    myProfileDetails: {},
    myProfileApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    this.setState({myProfileApiStatus: apiStatus.inProgress})
    const myProfileApi = `https://apis.ccbp.in/insta-share/my-profile`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(myProfileApi, options)
    if (response.ok) {
      const data = await response.json()

      const {profile} = data

      const updatedMyDetails = {
        id: profile.id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        postsCount: profile.posts_count,
        posts: profile.posts.map(eachPost => ({
          postId: eachPost.id,
          postImg: eachPost.image,
        })),
        stories: profile.stories.map(eachStory => ({
          storyId: eachStory.id,
          storyImg: eachStory.image,
        })),
      }

      this.setState({
        myProfileDetails: updatedMyDetails,
        myProfileApiStatus: apiStatus.success,
      })
    } else {
      this.setState({
        myProfileApiStatus: apiStatus.failure,
      })
    }
  }

  renderMyProfileView = () => {
    const {myProfileDetails} = this.state
    return (
      <div className="user-profile-content-container">
        <ProfilePage profileDetails={myProfileDetails} />
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfileFailureView = () => (
    <div className="user-profile-failure-container">
      <img
        className="user-profile-failure-img"
        src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1707800767/Group_7522_dqxbrj.png"
        alt="failure view"
      />
      <p className="user-profile-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-button"
        type="button"
        onClick={this.getMyProfileDetails}
      >
        Try Again
      </button>
    </div>
  )

  switchingMyProfileContent = () => {
    const {myProfileApiStatus} = this.state
    switch (myProfileApiStatus) {
      case apiStatus.success:
        return this.renderMyProfileView()
      case apiStatus.failure:
        return this.renderMyProfileFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const activeTab = 'PROFILE'
    return (
      <div className="user-profile-container">
        <Header activeTab={activeTab} />
        <div className="user-profile-loader-container">
          {this.switchingMyProfileContent()}
        </div>
      </div>
    )
  }
}

export default MyProfile
