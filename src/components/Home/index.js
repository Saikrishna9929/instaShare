import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import StoriesSlider from '../StoriesSlider'
import PostItem from '../PostItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    storiesList: [],
    postsList: [],
    homeStorySliderApiStatus: apiStatus.initial,
    homePostsApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getStoriesList()
    this.getPostsList()
  }

  getStoriesList = async () => {
    this.setState({homeStorySliderApiStatus: apiStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const storiesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(storiesApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedStoriesList = data.users_stories.map(eachStory => ({
        storyUrl: eachStory.story_url,
        userId: eachStory.user_id,
        userName: eachStory.user_name,
      }))

      this.setState({
        storiesList: updatedStoriesList,
        homeStorySliderApiStatus: apiStatus.success,
      })
    } else {
      this.setState({homeStorySliderApiStatus: apiStatus.failure})
    }
  }

  getPostsList = async () => {
    this.setState({homePostsApiStatus: apiStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const postsApiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(postsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedPostsList = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        postDetails: {
          imageUrl: eachPost.post_details.image_url,
          caption: eachPost.post_details.caption,
        },
        likesCount: eachPost.likes_count,
        comments: eachPost.comments.map(eachComment => ({
          commentUserName: eachComment.user_name,
          commentUserId: eachComment.user_id,
          comment: eachComment.comment,
        })),

        createdAt: eachPost.created_at,
      }))
      this.setState({
        postsList: updatedPostsList,
        homePostsApiStatus: apiStatus.success,
      })
    } else {
      this.setState({homePostsApiStatus: apiStatus.failure})
    }
  }

  renderHomeStorySliderView = () => {
    const {storiesList} = this.state
    return <StoriesSlider storiesList={storiesList} />
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderHomePostsFailureView = () => (
    <div className="posts-failure-container">
      <img
        className="home-failure-img"
        src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1707302431/Icon_hxxt6b.png"
        alt="failure view"
      />
      <p className="home-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.getPostsList}
      >
        Try Again
      </button>
    </div>
  )

  renderHomeStoriesFailureView = () => (
    <div className="posts-failure-container">
      <img
        className="home-failure-img"
        src="https://res.cloudinary.com/dcljk0dvw/image/upload/v1707302431/Icon_hxxt6b.png"
        alt="failure view"
      />
      <p className="home-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.getStoriesList}
      >
        Try Again
      </button>
    </div>
  )

  switchingHomeStroySliderContent = () => {
    const {homeStorySliderApiStatus} = this.state
    switch (homeStorySliderApiStatus) {
      case apiStatus.success:
        return this.renderHomeStorySliderView()
      case apiStatus.failure:
        return this.renderHomeStoriesFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderHomePostsListView = () => {
    const {postsList} = this.state

    return (
      <ul className="posts-list-container">
        {postsList.map(eachPost => (
          <PostItem key={eachPost.postId} postItemDetails={eachPost} />
        ))}
      </ul>
    )
  }

  switchingHomePostsListContent = () => {
    const {homePostsApiStatus} = this.state
    switch (homePostsApiStatus) {
      case apiStatus.success:
        return this.renderHomePostsListView()
      case apiStatus.failure:
        return this.renderHomePostsFailureView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {storiesList, postsList} = this.state
    const activeTab = 'HOME'
    console.log(storiesList, postsList)
    return (
      <div className="home-container">
        <Header activeTab={activeTab} />
        <div className="home-content-container">
          <div className="stories-slider-container">
            {this.switchingHomeStroySliderContent()}
          </div>
          <div className="post-list-bg-container">
            {this.switchingHomePostsListContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
