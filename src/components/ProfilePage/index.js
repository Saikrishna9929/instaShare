import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfilePage = props => {
  const {profileDetails} = props

  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    postsCount,
    posts,
    stories,
  } = profileDetails

  return (
    <>
      <div className="profile-user-details-container">
        <img className="profile-pic-1" src={profilePic} alt="user profile" />
        <div className="profile-details-container">
          <h1 className="profile-username">{userName}</h1>
          <ul className="profile-details-list-container">
            <li className="profile-pic-container">
              <img
                className="profile-pic-2"
                src={profilePic}
                alt="user profile"
              />
            </li>
            <li className="posts-count">
              <span className="span-posts-count">{postsCount}</span> posts
            </li>
            <li className="followers-count">
              <span>{followersCount}</span> followers
            </li>
            <li className="following-count">
              <span>{followingCount}</span> following
            </li>
          </ul>
          <p className="profile-user-id">{userId}</p>
          <p className="profile-user-bio">{userBio}</p>
        </div>
      </div>
      <ul className="stories-list-container">
        {stories.map(eachStory => {
          const {storyId, storyImg} = eachStory
          return (
            <li className="story-item" key={storyId}>
              <img className="story-img" src={storyImg} alt="user story" />
            </li>
          )
        })}
      </ul>
      <hr className="horizontal-line" />
      <div className="posts-container">
        <div className="posts-logo-container">
          <BsGrid3X3 color="#262626" size="18" />
          <p className="posts-logo-text">Posts</p>
        </div>
        {posts.length > 0 ? (
          <ul className="profile-posts-list-container">
            {posts.map(eachPost => (
              <li className="posts-list-item" key={eachPost.postId}>
                <img
                  className="profile-post-img"
                  src={eachPost.postImg}
                  alt="user post"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-posts-container">
            <div className="no-posts-logo-container">
              <BiCamera color="#262626" className="bi-camera" />
            </div>
            <p className="no-posts-msg">No Posts Yet</p>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePage
