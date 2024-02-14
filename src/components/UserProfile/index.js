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

class UserProfile extends Component {
  state = {
    userProfileDetails: {},
    userProfileApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    this.setState({userProfileApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const userProfileApi = `https://apis.ccbp.in/insta-share/users/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(userProfileApi, options)
    if (response.ok) {
      const data = await response.json()

      const updatedUserDetails = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        userBio: data.user_details.user_bio,
        postsCount: data.user_details.posts_count,
        posts: data.user_details.posts.map(eachPost => ({
          postId: eachPost.id,
          postImg: eachPost.image,
        })),
        stories: data.user_details.stories.map(eachStory => ({
          storyId: eachStory.id,
          storyImg: eachStory.image,
        })),
      }

      this.setState({
        userProfileDetails: updatedUserDetails,
        userProfileApiStatus: apiStatus.success,
      })
    } else {
      this.setState({
        userProfileApiStatus: apiStatus.failure,
      })
    }
  }

  renderUserProfileView = () => {
    const {userProfileDetails} = this.state
    return (
      <div className="user-profile-content-container">
        <ProfilePage profileDetails={userProfileDetails} />
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserProfileFailureView = () => (
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
        onClick={this.getUserProfileDetails}
      >
        Try Again
      </button>
    </div>
  )

  switchingUserProfileContent = () => {
    const {userProfileApiStatus} = this.state
    switch (userProfileApiStatus) {
      case apiStatus.success:
        return this.renderUserProfileView()
      case apiStatus.failure:
        return this.renderUserProfileFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-container">
        <Header />
        <div className="user-profile-loader-container">
          {this.switchingUserProfileContent()}
        </div>
      </div>
    )
  }
}

export default UserProfile
