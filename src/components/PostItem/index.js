import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Component} from 'react'
import './index.css'

class PostItem extends Component {
  state = {
    isLiked: false,
  }

  onLikeThePost = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {postItemDetails} = this.props
    const {postId} = postItemDetails
    const postLikeApiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const userRequest = {
      like_status: true,
    }
    const options = {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userRequest),
    }
    const response = await fetch(postLikeApiUrl, options)
    const data = await response.json()
    console.log(data.message)
    if (response.ok) {
      this.setState({isLiked: true})
    }
  }

  onDislikeThePost = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {postItemDetails} = this.props
    const {postId} = postItemDetails
    const postLikeApiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const userRequest = {
      like_status: false,
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userRequest),
    }
    const response = await fetch(postLikeApiUrl, options)
    const data = await response.json()
    console.log(data.message)
    if (response.ok) {
      this.setState({isLiked: false})
    }
  }

  render() {
    const {isLiked} = this.state
    const {postItemDetails} = this.props
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      comments,
      createdAt,
    } = postItemDetails
    const {imageUrl, caption} = postDetails
    const updatedLikesCount = isLiked ? likesCount + 1 : likesCount

    return (
      <li className="post-item-container">
        <div className="post-user-details-container">
          <Link className="profile-link-item" to={`/users/${userId}`}>
            <div className="post-user-profile-img-container">
              <img
                className="post-user-profile-img"
                src={profilePic}
                alt="post author profile"
              />
            </div>

            <p className="post-user-name">{userName}</p>
          </Link>
        </div>
        <div className="post-img-container">
          <img className="post-img" src={imageUrl} alt="post" />
        </div>

        <div className="post-img-details-container">
          <div className="post-like-comment-share-details">
            {isLiked ? (
              <button
                type="button"
                className="post-like-button"
                onClick={this.onDislikeThePost}
                data-testid="unLikeIcon"
              >
                <FcLike color="#475569" size="24" />
              </button>
            ) : (
              <button
                type="button"
                className="post-like-button"
                onClick={this.onLikeThePost}
                data-testid="likeIcon"
              >
                <BsHeart color="#475569" size="24" />
              </button>
            )}
            <FaRegComment color="#475569" size="24" />
            <BiShareAlt color="#475569" size="24" />
          </div>
          <p className="post-likes-count">{updatedLikesCount} likes</p>
          <p className="post-caption">{caption}</p>
          <ul className="post-comments-list-container">
            {comments.map(eachComment => {
              const {commentUserName, commentUserId, comment} = eachComment
              return (
                <li
                  className="post-comment-item-container post-comment-username-comment-text"
                  key={commentUserId}
                >
                  <b>{commentUserName} </b>
                  {comment}
                </li>
              )
            })}
          </ul>
          <p className="post-created-time">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default PostItem
